import React from 'react';
import CustomAppBar from './CustomAppBar';

export default function Layout({ children }) {
  return (
    <>
      <CustomAppBar />
      {children}
    </>
  );
}
