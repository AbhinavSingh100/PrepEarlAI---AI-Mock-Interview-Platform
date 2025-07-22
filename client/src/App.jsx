import { useState } from 'react'
import './styles/App.css'
import InterviewWindow from './pages/InterviewWindow'
import Navbar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import Feedback from './pages/Feedback'
import Interview from './pages/Interview';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
        
        {/* Protected Group */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      
    </Router>
    {/* <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/interview" element={<InterviewWindow />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router> */}
    </>
  )
}

export default App
