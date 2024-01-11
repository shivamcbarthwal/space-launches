import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LaunchList from './components/LaunchList';
import LaunchDetail from './components/LaunchDetail';
import { LaunchProvider } from './context/LaunchContext';

function App() {
  return (
    <Router>
      <LaunchProvider>
        <Routes>
          <Route path="/" element={<LaunchList />} />
          <Route path="/launch/:launchId" element={<LaunchDetail />} />
        </Routes>
      </LaunchProvider>     
    </Router>
  );
}

export default App;
