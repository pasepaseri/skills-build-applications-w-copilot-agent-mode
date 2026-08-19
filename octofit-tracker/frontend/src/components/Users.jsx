import { useEffect, useState } from 'react'
import CollectionState from './CollectionState.jsx'
import { getCollection } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { getCollection('users').then((data) => { setUsers(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <CollectionPage title="Users" subtitle="Students taking part in the challenge." state={state} empty={!users.length}><div className="card-grid">{users.map((user) => <article className="data-card user-card" key={user._id}><span className="avatar">{user.avatar || user.name?.slice(0, 2)}</span><div><h3>{user.name}</h3><p>Grade {user.grade} · {user.email}</p></div></article>)}</div></CollectionPage>
}

function CollectionPage({ title, subtitle, state, empty, children }) { return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT DATA</p><h2>{title}</h2><p>{subtitle}</p></div></div><CollectionState {...state} empty={empty}>{children}</CollectionState></section> }