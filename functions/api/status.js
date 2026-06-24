export async function onRequest(context) {
  const { env } = context;
  if (!env.SPOTIFY_TOKENS) {
    return new Response(
      JSON.stringify({
        connected: false,
        error: "Server misconfiguration: SPOTIFY_TOKENS KV not bound",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
  const tokensRaw = await env.SPOTIFY_TOKENS.get("tokens");
  return new Response(JSON.stringify({ connected: !!tokensRaw }), {
    headers: { "Content-Type": "application/json" },
  });
}
