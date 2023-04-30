import React from 'react';
import logo from './logo.svg';
import './App.css';
import { displayNotification } from './notifications';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={displayNotification}>Enable notifications</button>
      </header>
    </div>
  );
}

export default App;
