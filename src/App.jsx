import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/landing-page';
import AboutPage from './pages/about-page';
import CoursesPage from './pages/courses-page';
import ContactsPage from './pages/contacts-page';
import CoursePage from './pages/course-page';
import CheckOutPage from './pages/checkout-page';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/courses/:courseId' element={<CoursePage />} />
          <Route
            path='/courses/checkout/:courseId'
            element={<CheckOutPage />}
          />
          <Route path='/contacts' element={<ContactsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
