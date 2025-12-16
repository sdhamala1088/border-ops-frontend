import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import TravelersPage from './pages/TravelersPage'
import PortPage from "./pages/PortsPage"

function App() {
  return (
    <div>
      <nav style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#f3f3f3",
        marginBottom: "1rem",
      }}>
        <Link to="/">Travelers</Link>
        <Link to="/ports">Ports of Entry</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TravelersPage />} />
        <Route path="/ports" element={<PortPage />} />
      </Routes>
    </div>
  )
};

export default App
