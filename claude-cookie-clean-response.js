const claudeDomains = ["claude.ai", "claude.com", "anthropic.com"];
const url = $request.url || "";
const headers = $response.headers || {};

const isClaudeDomain = claudeDomains.some(domain => url.includes(domain));

if (isClaudeDomain) {
  headers["Set-Cookie"] = [
    "sessionKey=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai; Secure; HttpOnly; SameSite=Lax",
    "routingHint=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai; Secure; SameSite=Lax",
    "sessionKey=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=claude.ai; Secure; HttpOnly; SameSite=Lax",
    "routingHint=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=claude.ai; Secure; SameSite=Lax"
  ];

  $notification.post(
    "Claude Cookie Clean",
    "Response cookie expired",
    "Expired sessionKey/routingHint"
  );
}

$done({
  headers
});
