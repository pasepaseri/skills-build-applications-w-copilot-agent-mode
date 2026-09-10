export default function CollectionState({ loading, error, empty, children }) {
  if (loading) return <p className="collection-message">Loading data…</p>
  if (error) return <p className="collection-message error-message">{error}</p>
  if (empty) return <p className="collection-message">No records found.</p>
  return children
}