import React from 'react'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth';
import Navbar from './shared/components/NavBar';
import Navigation from './navigation';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="pt-16 bg-[#cacacc]" >
          <Navigation />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App