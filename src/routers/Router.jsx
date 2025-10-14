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
import Product from '../pages/admin/Product'
import User from '../pages/admin/User'
import DashboardHome from '../pages/admin/DashboardHome'
import ProtectedRoute from '../components/ProtectedRoute'
import Order from '../pages/admin/Order'


function Router() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname.startsWith("/admin") || // all admin pages
    ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path='*' element={"404 not found"}/>
        <Route path="/about" element={<About />} />
        <Route path="/course" element={<Course />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roleRequired={1}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />     
          <Route path="user" element={<User />} />         
          <Route path="product" element={<Product />} />   
          <Route path="order" element={<Order />} />   
        </Route>
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  )
}
export default Router