export async function getCurrenciesfromAPI(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
