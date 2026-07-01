const isClaude = /(^|\.)claude\.ai|(^|\.)claude\.com|(^|\.)anthropic\.com/i.test(
  new URL($request.url).hostname
);

if (!isClaude) {
  $done({});
}

if (typeof $response === "undefined") {
  let headers = $request.headers || {};

  const cookieKey = Object.keys(headers).find(
    k => k.toLowerCase() === "cookie"
  );

  if (cookieKey && headers[cookieKey]) {
    headers[cookieKey] = headers[cookieKey]
      .split(";")
      .map(x => x.trim())
      .filter(
        x =>
          !x.startsWith("sessionKey=") &&
          !x.startsWith("routingHint==")
      )
      .join("; ");

    if (!headers[cookieKey]) {
      delete headers[cookieKey];
    }
  }

  $done({ headers });
} else {
  let headers = $response.headers || {};

  Object.keys(headers).forEach(key => {
    if (key.toLowerCase() === "set-cookie") {
      let cookies = headers[key];

      if (!Array.isArray(cookies)) {
        cookies = [cookies];
      }

      headers[key] = cookies.filter(
        c =>
          !/^sessionKey=/i.test(c) &&
          !/^routingHint=/i.test(c)
      );
    }
  });

  $done({ headers });
}
