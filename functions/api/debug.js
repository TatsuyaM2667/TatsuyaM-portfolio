export async function onRequest(context) {
  const { env } = context;
  // return only presence booleans; do NOT return secrets
  const info = {
    spotify_tokens_kv_bound: !!env.SPOTIFY_TOKENS,
    spotify_client_id_set: !!env.SPOTIFY_CLIENT_ID,
    spotify_client_secret_set: !!env.SPOTIFY_CLIENT_SECRET,
    spotify_redirect_uri_set: !!env.SPOTIFY_REDIRECT_URI,
  };
  return new Response(JSON.stringify(info), { headers: { 'Content-Type': 'application/json' } });
}
