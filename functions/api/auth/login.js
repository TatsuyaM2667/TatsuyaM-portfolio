export async function onRequest(context) {
  const { env } = context;
  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const REDIRECT_URI =
    env.SPOTIFY_REDIRECT_URI ||
    `https://${context.request.headers.get("host")}/api/auth/callback`;

  if (!CLIENT_ID) {
    return new Response("Missing SPOTIFY_CLIENT_ID", { status: 500 });
  }

  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-read-private",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    show_dialog: "true",
  });

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
    302,
  );
}
