import { useEffect, useState } from 'react'
import CollectionState from './CollectionState.jsx'
import { getCollection } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection('teams').then((data) => { setTeams(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <CollectionPage title="Teams" subtitle="The groups making progress together." state={state} empty={!teams.length}><div className="card-grid">{teams.map((team) => <article className="data-card" key={team._id}><span className="team-swatch" style={{ backgroundColor: team.color }} /><h3>{team.name}</h3><p>{Array.isArray(team.members) ? `${team.members.length} members` : 'Team'}</p></article>)}</div></CollectionPage>
}

function CollectionPage({ title, subtitle, state, empty, children }) { return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT DATA</p><h2>{title}</h2><p>{subtitle}</p></div></div><CollectionState {...state} empty={empty}>{children}</CollectionState></section> }