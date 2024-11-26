import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import MainPage from './Components/MainPage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  

  return (
    <>
       <Router>
       <Navbar/>
           <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
             <Route path="*" element= {
              <>
                  <MainPage/>
              </>
             }/>
           </Routes>
       </Router>
  
      
      
    </>
  )
}

export default App
