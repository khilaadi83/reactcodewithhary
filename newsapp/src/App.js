import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  state = {
    progress: 10
  }
  setProgress = (progress) => {
    this.setState({ progress })
  }
  render() {
    return (

      <Router>
        <div>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}

          />
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} pageSize={5} country='us' category='sports' />} />
          </Routes>
          <Routes>
            <Route path="/health" element={<News setProgress={this.setProgress} pageSize={5} country='us' category='health' />} />
          </Routes>
          <Routes>
            <Route path="/science" element={<News setProgress={this.setProgress} pageSize={5} country='us' category='science' />} />
          </Routes>
          <Routes>
            <Route path="/sports" element={<News setProgress={this.setProgress} pageSize={5} country='us' category='sports' />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
