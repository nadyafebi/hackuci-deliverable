import React from 'react';
import Form from './components/Form';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div>
        <Form className="form" />
      </div>
      <div>
        <img src="/petr.png" alt="petr" className="petr" />
      </div>
    </div>
  );
}

export default App;
