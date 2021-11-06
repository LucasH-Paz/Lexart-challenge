import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ currentDoc, items, setters }) => {
  const {
    quantity, price, product, client, _id,
  } = currentDoc;

  const { setItems, resetStates } = setters;

  const handleStates = (payload, id) => {
    const newItems = items.reduce((acc, cur) => {
      // eslint-disable-next-line no-underscore-dangle
      acc.push(cur._id === id ? payload : cur);
      return acc;
    }, []);

    setItems(newItems);
    resetStates();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { _id };

    payload.quantity = document.querySelector('#qnty').value;
    payload.product = { name: document.querySelector('#prdt').value };
    payload.price = document.querySelector('#prc').value;
    payload.client = { name: document.querySelector('#clt').value };
    payload.active = `${document.querySelector('#status').checked}`;

    handleStates(payload, _id);
    return payload;
  };

  return (
    <form>
      <input type="number" name="quantity" defaultValue={quantity} id="qnty" />
      <input type="number" name="price" defaultValue={price} id="prc" />
      <input type="text" name="client" defaultValue={client.name} id="clt" />
      <input type="text" name="product" defaultValue={product.name} id="prdt" />
      <input type="checkbox" name="active" defaultChecked id="status" />
      <button type="submit" onClick={handleSubmit}>Salvar</button>
    </form>
  );
};

Form.propTypes = {
  currentDoc: PropTypes.object,
}.isRequired;

export default Form;
