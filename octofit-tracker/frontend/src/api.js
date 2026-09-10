const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function getCollection(endpoint) {
  const requestUrl = endpoint.startsWith('http') ? endpoint : `${apiBaseUrl}${endpoint}`
  const response = await fetch(requestUrl)
  if (!response.ok) throw new Error(`Unable to load ${endpoint}`)
  return responseItems(await response.json())
}