import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/user/Home'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'
import Course from '../pages/user/Course'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Dashboard from '../pages/admin/Dashboard'


function Router() {
  const location = useLocation();
   const hideNavAndFooter = ["/login", "/register","/admin"].includes(location.pathname);
  return (
    <>
    {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/course' element={<Course />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard/>}/>
      </Routes>
       {!hideNavAndFooter && <Footer />}
    </>
  )
}
export default Router