import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.login.value.isLoggedIn);

  if (!isLoggedIn) {
    // return undefined;
    return <Navigate to='/login-signup' replace />;
  }

  return children;
}

export default ProtectedRoute;
