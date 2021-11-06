/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './Components/Header';
import List from './Components/List';

const mockDocuments = [
  {
    _id: 1,
    quantity: 10,
    product: { name: 'Tomate' },
    price: 100,
    client: { name: 'Lucas' },
    active: 'true',
  },
  {
    _id: 2,
    quantity: 15,
    product: { name: 'Abobrinha' },
    price: 50,
    client: { name: 'João' },
    active: 'false',
  },
];

function App() {
  const DEFAULT_DOC = {
    _id: 0,
    quantity: 0,
    product: { name: '' },
    price: 0,
    client: { name: '' },
    active: 'true',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(DEFAULT_DOC);
  const [isUpdate, setIsUpdate] = useState(false);

  const resetStates = () => {
    setIsEditing(false);
    setCurrentDoc(DEFAULT_DOC);
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <Header setIsEditing={setIsEditing} isEditing={isEditing} />
      <List
        items={items}
        setter={
        {
          setIsEditing, setItems, setIsUpdate, setCurrentDoc,
        }
        }
      />
    </div>
  );
}

export default App;
