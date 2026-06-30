const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

$notification.post(
  "Claude Fix",
  "Matched /api/account",
  "Returned 401 session_expired"
);

$done({
  response: {
    status: 401,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": "sessionKey=; Path=/; Domain=.claude.ai; Max-Age=0; Secure; HttpOnly; SameSite=Lax"
    },
    body
  }
});
