import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">MERGINGTON HIGH SCHOOL</p>
          <h1>OctoFit Tracker</h1>
        </div>
        <span className="status-dot">Live workspace</span>
      </header>
      <nav className="app-nav" aria-label="Primary navigation">
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <div className="overview-copy">
        <p className="eyebrow">FITNESS, TOGETHER</p>
        <h2>Small steps. Strong teams.</h2>
        <p>Track movement, celebrate consistency, and keep Mergington moving forward.</p>
      </div>
      <div className="overview-links">
        <NavLink className="action-link" to="/activities">Logged activities <span>→</span></NavLink>
        <NavLink className="action-link" to="/workouts">Find a workout <span>→</span></NavLink>
      </div>
    </section>
  )
}

export default App
