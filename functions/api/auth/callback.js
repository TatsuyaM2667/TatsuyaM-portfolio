export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error)
    return new Response("Authorization error: " + error, { status: 400 });
  if (!code) return new Response("Missing code", { status: 400 });

  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
  const REDIRECT_URI =
    env.SPOTIFY_REDIRECT_URI ||
    `https://${request.headers.get("host")}/api/auth/callback`;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response("Missing Spotify client credentials", { status: 500 });
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await tokenRes.json();
  if (!tokenRes.ok) {
    return new Response(JSON.stringify(data), {
      status: tokenRes.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in || 3600) * 1000,
  };

  // store tokens in KV (binding name: SPOTIFY_TOKENS) if available
  if (env.SPOTIFY_TOKENS) {
    try {
      await env.SPOTIFY_TOKENS.put("tokens", JSON.stringify(tokens));
    } catch (e) {
      console.error("Failed to save tokens to KV", e);
    }
  } else {
    console.warn("SPOTIFY_TOKENS KV not bound; tokens will not be persisted");
  }

  // small success page, close window
  const html = `
  <!doctype html>
  <html>
    <head><meta charset="utf-8"><title>Spotify connected</title></head>
    <body>
      <h2>Spotify connected. You can close this window.</h2>
      ${env.SPOTIFY_TOKENS ? "" : '<p style="color:orange">Note: server KV not configured, tokens will not be saved. See project README for Cloudflare Pages KV setup.</p>'}
      <script>
        if (window.opener) {
          try { window.opener.postMessage({ type: 'spotify_connected' }, '*'); } catch (e) {}
        }
      </script>
    </body>
  </html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
