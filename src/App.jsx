/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header setters={() => (console.log('olá'))} isEditing={false} />
    </div>
  );
}

export default App;
