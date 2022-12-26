import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/landing-page';
import AboutPage from './pages/about-page';
import CoursesPage from './pages/courses-page';
import HelpPage from './pages/help-page/Index';
import CoursePage from './pages/course-page';
import CheckOutPage from './pages/checkout-page';
import LoginSignupPage from './pages/login-signup-page';
import StudentInterfacePage from './pages/student-interface-page';
import InstructorInterfacePage from './pages/instructor-interface-page';
import AdminInterfacePage from './pages/admin-interface-page';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmOrder from './pages/checkout-page/ConfirmOrder';
import SuccessfulPayment from './pages/checkout-page/SuccessfulPayment';
import CertificateView from './components/CertificateView';
import ResetPasswordView from './pages/login-signup-page/ResetPasswordView';
import ProfilePage from '../src/pages/profile/ProfilePage';
import TestsPage from './pages/tests-page';
import RedirectToEmailVerification from './pages/login-signup-page/RedirectToEmailVerification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/about' element={<AboutPage />} />
          <Route
            path='/courses/checkout/:courseId'
            element={<CheckOutPage />}
          />
          <Route path='/courses/checkout/review' element={<ConfirmOrder />} />
          <Route
            path='/courses/checkout/success'
            element={<SuccessfulPayment />}
          />
          <Route
            path='/students'
            element={
              <ProtectedRoute>
                <StudentInterfacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/instructor'
            element={
              <ProtectedRoute>
                <InstructorInterfacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminInterfacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/tests'
            element={
              <ProtectedRoute>
                <TestsPage />
              </ProtectedRoute>
            }
          />
          <Route path='/reset-password' element={<ResetPasswordView />} />
          <Route path='/courses/:courseId' element={<CoursePage />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/login-signup' element={<LoginSignupPage />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/verify-email/:token' element={<RedirectToEmailVerification />} />
          <Route
            path='/certificates/:certificateId'
            element={<CertificateView />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}
