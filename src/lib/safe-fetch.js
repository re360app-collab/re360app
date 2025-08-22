export async function safeFetch(url, init) {
  if (!url || !String(url).trim()) throw new Error("safeFetch: empty URL");
  return fetch(url, init);
}