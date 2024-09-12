import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/noteState';
import AuthState from './context/Auth/AuthState'; // Import AuthState
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <NoteState>
      <AuthState> {/* Wrapping the entire app with AuthState */}
        <Router>
          <Alert message="This is a primary alert—check it out!" />
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </AuthState>
    </NoteState>
  );
}

export default App;
