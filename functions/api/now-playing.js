export async function onRequest(context) {
  const { env } = context;
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

  // fetch currently playing
  try {
    const resp = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

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
      const mapped = {
        is_playing: false,
        progress_ms: null,
        item: item,
      };
      return new Response(JSON.stringify({ connected: true, ...mapped }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!resp.ok) {
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
          if (item)
            return new Response(
              JSON.stringify({ connected: true, is_playing: false, item }),
              { headers: { "Content-Type": "application/json" } },
            );
        }
      } catch (_) {
        // ignore
      }

      return new Response(JSON.stringify({ connected: true, error: txt }), {
        status: resp.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify({ connected: true, ...data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ connected: true, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
