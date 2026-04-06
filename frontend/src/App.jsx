import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup"
import Login from "./pages/login"
import Homepage from "./pages/Homepage"
import Lobby from './pages/Lobby';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
axios.defaults.withCredentials = true;
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/signup' element={ <Signup />} />
          <Route path='/login' element={ <Login /> } />
          <Route path='/homepage' element={<ProtectedRoute><Homepage /></ProtectedRoute> } />
          <Route path="/lobby/:roomId" element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
