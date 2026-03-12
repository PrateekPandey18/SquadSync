import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup"
import Login from "./pages/login"
import Homepage from "./pages/Homepage"
import Lobby from './pages/Lobby';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path="/lobby/:roomId" element={<Lobby />} />
        
      </Routes>
    </Router>
  )
}

export default App
