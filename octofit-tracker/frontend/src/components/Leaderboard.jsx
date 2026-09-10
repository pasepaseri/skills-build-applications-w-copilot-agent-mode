import { useEffect, useState } from 'react'
import CollectionState from './CollectionState.jsx'
import { getCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection(endpoint).then((data) => { setEntries(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <CollectionPage title="Leaderboard" subtitle="A friendly measure of momentum." state={state} empty={!entries.length}><div className="leaderboard-list">{entries.map((entry) => <article className="leaderboard-row" key={entry._id}><strong>#{entry.rank}</strong><span>{entry.user?.name || entry.user?.email || entry.user || 'Unknown'}</span><b>{entry.points} pts</b></article>)}</div></CollectionPage>
}

function CollectionPage({ title, subtitle, state, empty, children }) { return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT DATA</p><h2>{title}</h2><p>{subtitle}</p></div></div><CollectionState {...state} empty={empty}>{children}</CollectionState></section> }