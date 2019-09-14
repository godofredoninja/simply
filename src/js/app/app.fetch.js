/* global fetch */
export default async (url) => {
  const rsp = await fetch(url)
  const data = await rsp.json()

  return data
}
