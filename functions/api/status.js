export async function onRequest(context) {
  const { env } = context;
  const tokensRaw = await env.SPOTIFY_TOKENS.get('tokens');
  return new Response(JSON.stringify({ connected: !!tokensRaw }), { headers: { 'Content-Type': 'application/json' } });
}
