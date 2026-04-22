export async function getLiveMatches() {
  const response = await fetch("http://127.0.0.1:8000/api/live")

  if (!response.ok) {
    throw new Error("Failed to fetch live matches")
  }

  const data = await response.json()
  return data.data
}