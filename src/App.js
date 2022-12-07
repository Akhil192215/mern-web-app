import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Secret from './pages/Secret'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import UserProfile from './pages/UserProfile'
import "./index.css";
import { AppContext } from './AppContext'
import EditUser from './pages/EditUser'
import Navbar from './pages/Navbar'
import CreateUser from './pages/CreateUser'
function App() {
  const [img, setImg] = useState([])
  const getUsers = async () => {
    try {

    } catch {

    }
  }




  useEffect(() => {
    axios.get('http://localhost:4000/userHome').then((data) => {
      setImg(data.data)
    })
  },[img])





  return (
    <AppContext.Provider value={img} >

      <BrowserRouter>

        <Routes>

          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<div><Navbar /><Secret /></div>} />
          <Route exact path='/user' element={<UserProfile name={setImg} />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/admin-dashboard' element={<Dashboard />} />
          <Route exact path='/editUser' element={<EditUser />} />
          <Route exact path='/createUser' element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App