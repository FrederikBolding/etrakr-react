addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});


/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const apiKey = 'API KEY HERE'
  const { pathname, search } = new URL(request.url);
  const queryParams = search.replace("?", "").split("&").filter(param => !param.includes('api_key'))
  const queryParamsWithKey = [...queryParams, `api_key=${apiKey}`]
  const [_, type, ...rest] = pathname.split("/");
  if (type === "tmdb") {
    const url = `https://api.themoviedb.org/3/${rest.join("/")}?${queryParamsWithKey.join("&")}`;
    return fetch(url);
  }
  return new Response(undefined, { status: 400 });
}

