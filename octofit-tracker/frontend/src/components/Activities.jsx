import { useEffect, useState } from 'react'
import CollectionState from './CollectionState.jsx'
import { getCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getCollection('activities').then((data) => {
      setActivities(data)
      setState({ loading: false, error: '' })
    }).catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return <CollectionPage title="Activities" subtitle="Recent movement across the school." state={state} empty={!activities.length}>
    <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Student</th><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.user?.name || activity.user?.email || activity.user || 'Unknown'}</td><td className="capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.points}</td><td>{new Date(activity.recordedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
  </CollectionPage>
}

function CollectionPage({ title, subtitle, state, empty, children }) {
  return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT DATA</p><h2>{title}</h2><p>{subtitle}</p></div></div><CollectionState {...state} empty={empty}>{children}</CollectionState></section>
}