import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup"
import Login from "./pages/login"
import Homepage from "./pages/Homepage"
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<Homepage />} />
        {/* <Route path='/Signup' element={<Signup />} /> */}
      </Routes>
    </Router>
  )
}

export default App
