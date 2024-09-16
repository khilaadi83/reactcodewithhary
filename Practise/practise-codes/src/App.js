import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  let [count, setCounter] = useState(0)
  useEffect(() => {
    console.log('test')
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p> Counter {count} </p>
        <button onClick={() => {
          setCounter(count++)
        }}> Click</button>
      </header>
    </div>
  );
}

export default App;
