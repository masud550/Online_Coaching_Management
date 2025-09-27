// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

// Pages
import Home from './components/Home';
import Contact from './components/Contact';
import Courses from './components/Courses';
import RegisterWithCode from './components/RegisterWithCode';
import StudentDashboard from './components/StudentDashboard';
import CourseVideos from './components/CourseVideos';
import Login from './components/Login';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import InstitutionDashboard from './components/Dashboard/InstitutionDashboard';
import Expertise from './components/Expertise';
import Gallery from './components/Gallery';
import SuccessStory from './components/SuccessStory';
import Media from './components/Media';
import OurServices from './components/OurServices';
import Events from './components/Events';
import ExpertDetail from './components/ExpertDetail';
import CourseDetails from './components/CourseDetails';
import SuccessDetail from "./components/SuccessStory/SuccessDetail";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/successstory" element={<SuccessStory />} />
        <Route path="/media" element={<Media />} />
        <Route path="/events" element={<Events />} />
        <Route path="/ourservices" element={<OurServices />} />

        {/* Dashboards */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Other Pages */}
        <Route path="/newsletter" element={<div>Newsletter Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/mentors" element={<div>Mentors Page</div>} />
        <Route path="/register-with-code" element={<RegisterWithCode />} />
        <Route path="/course/:id/videos" element={<CourseVideos />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/success/:id" element={<SuccessDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
