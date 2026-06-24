export async function onRequest(context) {
  const { env } = context;
  // Ensure KV binding exists
  if (!env.SPOTIFY_TOKENS) {
    return new Response(
      JSON.stringify({
        connected: false,
        error: "Server misconfiguration: SPOTIFY_TOKENS KV not bound",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const CACHE_KEY = "now_playing_cache_v1";
  const CACHE_TTL = env.SPOTIFY_CACHE_TTL
    ? parseInt(env.SPOTIFY_CACHE_TTL, 10)
    : 30; // seconds (can override with env SPOTIFY_CACHE_TTL)

  const tokensRaw = await env.SPOTIFY_TOKENS.get("tokens");
  if (!tokensRaw)
    return new Response(JSON.stringify({ connected: false }), {
      headers: { "Content-Type": "application/json" },
    });

  let tokens;
  try {
    tokens = JSON.parse(tokensRaw);
  } catch (e) {
    return new Response(JSON.stringify({ connected: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Try cached result first to avoid hitting Spotify frequently
  try {
    const cachedRaw = await env.SPOTIFY_TOKENS.get(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (
        cached &&
        cached.ts &&
        Date.now() - cached.ts < CACHE_TTL * 1000 &&
        cached.data
      ) {
        return new Response(
          JSON.stringify({ connected: true, ...cached.data }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }
  } catch (e) {
    // ignore cache errors
  }

  // refresh if expired or missing
  if (
    !tokens.access_token ||
    !tokens.expires_at ||
    Date.now() > tokens.expires_at - 60_000
  ) {
    if (!tokens.refresh_token) {
      return new Response(
        JSON.stringify({ connected: true, error: "Missing refresh token" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", tokens.refresh_token);

    const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
    try {
      const resp = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const refreshed = await resp.json();
      if (resp.ok && refreshed.access_token) {
        tokens.access_token = refreshed.access_token;
        tokens.expires_at = Date.now() + (refreshed.expires_in || 3600) * 1000;
        if (refreshed.refresh_token)
          tokens.refresh_token = refreshed.refresh_token;
        await env.SPOTIFY_TOKENS.put("tokens", JSON.stringify(tokens));
      } else {
        return new Response(
          JSON.stringify({ connected: true, error: refreshed }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (e) {
      return new Response(
        JSON.stringify({ connected: true, error: String(e) }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  // fetch currently playing with fallbacks; store result in payload
  try {
    const resp = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    let payload = null;

    // No active playback - fall back to recently played
    if (resp.status === 204) {
      // try recently played
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${tokens.access_token}` } },
      );
      if (!recentRes.ok) {
        const txt = await recentRes.text();
        return new Response(
          JSON.stringify({ connected: true, is_playing: false, error: txt }),
          {
            status: recentRes.status,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const recent = await recentRes.json();
      const item =
        recent.items && recent.items[0] && recent.items[0].track
          ? recent.items[0].track
          : null;
      if (!item)
        return new Response(
          JSON.stringify({ connected: true, is_playing: false }),
          { headers: { "Content-Type": "application/json" } },
        );
      // normalize to same shape as currently-playing
      payload = {
        is_playing: false,
        progress_ms: null,
        item: item,
      };
    } else if (!resp.ok) {
      // Try fallback: if forbidden or other error, attempt recently-played
      const txt = await resp.text();
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
          if (item) {
            payload = { is_playing: false, item };
          }
        }
      } catch (_) {
        // ignore
      }

      if (!payload) {
        return new Response(JSON.stringify({ connected: true, error: txt }), {
          status: resp.status,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      const data = await resp.json();
      payload = data;
    }

    // store cache (best-effort)
    try {
      await env.SPOTIFY_TOKENS.put(
        CACHE_KEY,
        JSON.stringify({ ts: Date.now(), data: payload }),
        { expirationTtl: CACHE_TTL },
      );
    } catch (e) {
      // ignore cache write errors
    }

    return new Response(JSON.stringify({ connected: true, ...payload }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ connected: true, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
