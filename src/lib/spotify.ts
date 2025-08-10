let _appToken: { access_token: string; expires_at: number } | null = null;

export async function getAppAccessToken() {
  const now = Date.now();
  if (_appToken && now < _appToken.expires_at - 30_000) {
    return _appToken.access_token;
  }

  const body = new URLSearchParams();
  body.set("grant_type", "client_credentials");
  body.set("client_id", process.env.SPOTIFY_CLIENT_ID!);
  body.set("client_secret", process.env.SPOTIFY_CLIENT_SECRET!);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Spotify token error: ${err}`);
  }

  const json = (await res.json()) as { access_token: string; token_type: string; expires_in: number };
  _appToken = {
    access_token: json.access_token,
    expires_at: Date.now() + json.expires_in * 1000,
  };
  return _appToken.access_token;
}
