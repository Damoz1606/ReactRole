import React from 'react';
import './App.css';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Component from './pages/components/Component';
import { Paper } from '@mui/material';
import Signup from './pages/auth/Signup';

function App() {
  return <>
    <Paper elevation={5} sx={{
      width: "100%", height: "100vh", display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
      borderRadius: 0
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/components" element={<Component />} />
          <Route path="*" element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </Paper>
  </>;
}

export default App;
