import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import { useState } from'react';
import Alerts from './components/Alerts';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// so this code is called jsx
function App() {
  const [darkMode, setMode] = useState('dark');
  const [alert, setAlert] = useState(null);
  const showalert = (message, type) => {
   setAlert({
    msg : message,
    type : type
   });
   setTimeout(() => {
     setAlert(null);
    }, 3000);
  }
  const toggleMode = () => {
    if (darkMode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'white';
      showalert('Light Mode Enabled', 'success');
         
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'grey';
      showalert('Dark Mode Enabled', 'warning');
    }
  }
  return (
    <>
 
    <Navbar title="texutil playground" mode = {darkMode} toggleMode = {toggleMode}/>
    <Alerts  alertmode = {alert}/>
    <Routes>
            <Route path="/about" element={<About />}>
            </Route>
            <Route path="/" element={<TextForm title="Magic Text Generator" alertmode = {showalert}  mode = {darkMode}/> }>
            </Route>
          </Routes>
    
      <div className="tester"></div>
      
    </>
  );  
}

export default App;
