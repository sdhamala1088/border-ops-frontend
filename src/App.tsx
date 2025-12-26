import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import TravelersPage from './pages/TravelersPage'
import PortPage from "./pages/PortsPage"
import CrossingsPage from "./pages/CrossingsPage"

function App() {
  return (
    <div>
      <nav style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#f3f3f3ff",
        marginBottom: "1rem",
      }}>
        <Link to="/">Travelers</Link>
        <Link to="/ports">Ports of Entry</Link>
        <Link to="/crossings">Crossings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TravelersPage />} />
        <Route path="/ports" element={<PortPage />} />
        <Route path="/crossings" element={<CrossingsPage />} />
      </Routes>
    </div>
  )
};

export default App
