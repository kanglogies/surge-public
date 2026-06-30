const claudeDomains = ["claude.ai", "claude.com", "anthropic.com"];
const url = $request.url || "";
const headers = $request.headers || {};

const isClaudeDomain = claudeDomains.some(domain => url.includes(domain));

function getHeader(name) {
  const key = Object.keys(headers).find(
    item => item.toLowerCase() === name.toLowerCase()
  );
  return key ? { key, value: headers[key] } : null;
}

if (isClaudeDomain) {
  const cookieHeader = getHeader("Cookie");

  if (cookieHeader && cookieHeader.value) {
    const cleanedCookie = cookieHeader.value
      .split(";")
      .map(item => item.trim())
      .filter(item =>
        item &&
        !item.startsWith("sessionKey=") &&
        !item.startsWith("routingHint=")
      )
      .join("; ");

    if (cleanedCookie) {
      headers[cookieHeader.key] = cleanedCookie;
    } else {
      delete headers[cookieHeader.key];
    }

    $notification.post(
      "Claude Cookie Clean",
      "Request cookie cleaned",
      "Removed sessionKey/routingHint"
    );
  }
}

$done({
  headers
});
