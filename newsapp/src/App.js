import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<News pageSize={5} country='us' category='sports' />} />
          </Routes>
          <Routes>
            <Route path="/health" element={<News pageSize={5} country='us' category='health' />} />
          </Routes>
          <Routes>
            <Route path="/science" element={<News pageSize={5} country='us' category='science' />} />
          </Routes>
          <Routes>
            <Route path="/sports" element={<News pageSize={5} country='us' category='sports' />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
