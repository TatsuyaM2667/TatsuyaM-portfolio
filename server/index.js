import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI || "http://localhost:8888/auth/callback";
const PORT = process.env.PORT || 8888;
const TOKEN_PATH = path.join(process.cwd(), "server", ".spotify_tokens.json");

const app = express();
app.use(cors());
app.use(express.json());

async function loadTokens() {
  try {
    const data = await fs.readFile(TOKEN_PATH, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

async function saveTokens(tokens) {
  try {
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save tokens", e);
  }
}

async function refreshAccessTokenIfNeeded(tokens) {
  if (!tokens) return null;
  const willExpireSoon =
    !tokens.expires_at || Date.now() > tokens.expires_at - 60_000;
  if (!tokens.access_token || willExpireSoon) {
    if (!tokens.refresh_token) return tokens;
    console.log("Refreshing Spotify access token...");
    const form = new URLSearchParams();
    form.append("grant_type", "refresh_token");
    form.append("refresh_token", tokens.refresh_token);

    const resp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = await resp.json();
    if (data.access_token) {
      tokens.access_token = data.access_token;
      tokens.expires_at = Date.now() + (data.expires_in || 3600) * 1000;
      if (data.refresh_token) tokens.refresh_token = data.refresh_token;
      await saveTokens(tokens);
    } else {
      console.error("Failed to refresh token", data);
    }
  }
  return tokens;
}

app.get("/auth/login", (req, res) => {
  if (!CLIENT_ID)
    return res.status(500).send("Missing SPOTIFY_CLIENT_ID in environment");
  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-read-private",
  ].join(" ");

  const url =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    "&show_dialog=true";

  res.redirect(url);
});

app.get("/auth/callback", async (req, res) => {
  const { code, error } = req.query;
  if (error) return res.status(400).send("Authorization error: " + error);
  if (!code) return res.status(400).send("Missing code");

  try {
    const form = new URLSearchParams();
    form.append("grant_type", "authorization_code");
    form.append("code", String(code));
    form.append("redirect_uri", REDIRECT_URI);

    const resp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = await resp.json();
    if (data.error) {
      return res.status(400).json(data);
    }

    const tokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in || 3600) * 1000,
    };

    await saveTokens(tokens);

    // Inform the user they can close this tab
    res.send(
      `Spotify connected. You can close this window and return to your site.`,
    );
  } catch (e) {
    console.error(e);
    res.status(500).send("Token exchange failed");
  }
});

app.get("/api/now-playing", async (req, res) => {
  const tokens = await loadTokens();
  if (!tokens || !tokens.refresh_token) {
    return res.json({ connected: false });
  }

  await refreshAccessTokenIfNeeded(tokens);

  try {
    const resp = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    if (resp.status === 204) {
      // No active playback — try recently played
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${tokens.access_token}` } },
      );
      if (!recentRes.ok) {
        return res.json({ connected: true, is_playing: false });
      }
      const recent = await recentRes.json();
      const item =
        recent.items && recent.items[0] && recent.items[0].track
          ? recent.items[0].track
          : null;
      if (!item) return res.json({ connected: true, is_playing: false });
      return res.json({ connected: true, is_playing: false, item });
    }

    if (resp.status === 401) {
      // try refreshing once
      await refreshAccessTokenIfNeeded(tokens);
      const resp2 = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        },
      );
      if (resp2.status === 204) {
        const recentRes = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } },
        );
        if (!recentRes.ok)
          return res.json({ connected: true, is_playing: false });
        const recent = await recentRes.json();
        const item =
          recent.items && recent.items[0] && recent.items[0].track
            ? recent.items[0].track
            : null;
        if (!item) return res.json({ connected: true, is_playing: false });
        return res.json({ connected: true, is_playing: false, item });
      }
      if (!resp2.ok) {
        const txt = await resp2.text();
        return res.status(resp2.status).json({ connected: true, error: txt });
      }
      const data2 = await resp2.json();
      return res.json({ connected: true, ...data2 });
    }

    if (!resp.ok) {
      // fallback to recently played
      try {
        const recentRes = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } },
        );
        if (recentRes.ok) {
          const recent = await recentRes.json();
          const item =
            recent.items && recent.items[0] && recent.items[0].track
              ? recent.items[0].track
              : null;
          if (item)
            return res.json({ connected: true, is_playing: false, item });
        }
      } catch (e) {
        // ignore
      }

      const text = await resp.text();
      return res.status(resp.status).json({ connected: true, error: text });
    }

    const data = await resp.json();
    return res.json({ connected: true, ...data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "server error" });
  }
});

app.get("/api/status", async (req, res) => {
  const tokens = await loadTokens();
  res.json({ connected: !!(tokens && tokens.refresh_token) });
});

app.listen(PORT, () => {
  console.log(`Spotify helper server running on http://localhost:${PORT}`);
});
