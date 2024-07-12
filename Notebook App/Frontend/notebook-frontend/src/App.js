import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
         return (
           <NoteState>
             <Router>
               <Navbar />
               <Routes>
                 <Route path="/about" element={<About />} />
                 <Route path="/" element={<Home />} />
               </Routes>
             </Router>
           </NoteState>
         );
}

export default App;
