import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const [progress, setProgress] = useState(10);
  
  return (
    <Router>
      <div>
        <LoadingBar color='#f11946' progress={progress} />
        <Navbar />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} pageSize={5} country='us' category='sports' />} />
          <Route path="/health" element={<News setProgress={setProgress} pageSize={5} country='us' category='health' />} />
          <Route path="/science" element={<News setProgress={setProgress} pageSize={5} country='us' category='science' />} />
          <Route path="/sports" element={<News setProgress={setProgress} pageSize={5} country='us' category='sports' />} />
        </Routes>
      </div>
    </Router>
  );
}
