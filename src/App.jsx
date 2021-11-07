import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';

import Header from './Components/Header';
import List from './Components/List';
import Form from './Components/Form';
import Loading from './Components/Loading';

import { getItems } from './Services/network';

// const mockDocuments = [
//   {
//     _id: 1,
//     quantity: 10,
//     product: { name: 'Tomate' },
//     price: 100,
//     client: { name: 'Lucas' },
//     active: 'true',
//   },
//   {
//     _id: 2,
//     quantity: 15,
//     product: { name: 'Abobrinha' },
//     price: 50,
//     client: { name: 'João' },
//     active: 'false',
//   },
// ];

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
  const [isLoading, setIsLoading] = useState(false);

  const resetStates = () => {
    setIsEditing(false);
    setCurrentDoc(DEFAULT_DOC);
    setIsUpdate(false);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      const fetchItems = async () => {
        setIsLoading(true);
        const { data } = await getItems();
        setItems(data);
        setIsLoading(false);
      };
      fetchItems();
    } catch (e) {
      resetStates();
    }
  }, []);

  return (
    <div className="App">
      <Header setIsEditing={setIsEditing} isEditing={isEditing} />
      <div className="content-cntl">
        {isEditing && (
          <Form
            currentDoc={currentDoc}
            items={items}
            setters={
              { setItems, resetStates }
            }
            isUpdate={isUpdate}
          />
        )}
        <List
          items={items}
          setters={
            {
              setIsEditing, setItems, setCurrentDoc, setIsUpdate,
            }
          }
        />
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
