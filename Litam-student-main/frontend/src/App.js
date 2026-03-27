import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import StudentPortal from './pages/StudentPortal';
import Notices from './pages/Notices';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

import Login from './pages/Auth/Login';
import RegisterStudent from './pages/Auth/RegisterStudent';
import RegisterFaculty from './pages/Auth/RegisterFaculty';
import Logout from './pages/Auth/Logout';
import PrivateRoute from './components/PrivateRoute';
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import FacultyDashboard from './pages/Dashboards/FacultyDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register/student" element={<RegisterStudent />} />
            <Route path="/register/faculty" element={<RegisterFaculty />} />
            <Route path="/logout" element={<Logout />} />

            {/* Dashboards */}
            <Route path="/dashboard/student" element={
              <PrivateRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </PrivateRoute>
            } />
            <Route path="/dashboard/faculty" element={
              <PrivateRoute allowedRoles={['FACULTY']}>
                <FacultyDashboard />
              </PrivateRoute>
            } />
            <Route path="/dashboard/admin" element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
