import { useEffect, useState } from 'react'
import CollectionState from './CollectionState.jsx'
import { getCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection(endpoint).then((data) => { setWorkouts(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <CollectionPage title="Workouts" subtitle="Simple sessions for every starting point." state={state} empty={!workouts.length}><div className="card-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><p className="eyebrow">{workout.category} · {workout.difficulty}</p><h3>{workout.title}</h3><p>{workout.description}</p><strong>{workout.durationMinutes} minutes</strong></article>)}</div></CollectionPage>
}

function CollectionPage({ title, subtitle, state, empty, children }) { return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT DATA</p><h2>{title}</h2><p>{subtitle}</p></div></div><CollectionState {...state} empty={empty}>{children}</CollectionState></section> }