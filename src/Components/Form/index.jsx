/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { updateItem, newItem } from '../../Services/network';

const Form = ({ currentDoc, items, setters, isUpdate }) => {
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

  const toggleUpdate = async (id, payload) => {
    if (isUpdate) {
      await updateItem(id, payload);
      handleStates(payload, id);
      return;
    }
    const { data } = await newItem(payload);
    const { _id: ID, ...infos } = data;
    setItems([...items, { _id: ID, ...infos }]);
    resetStates();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};

    payload.quantity = document.querySelector('#qnty').value;
    payload.product = { name: document.querySelector('#prdt').value };
    payload.price = document.querySelector('#prc').value;
    payload.client = { name: document.querySelector('#clt').value };
    payload.active = `${document.querySelector('#status').checked}`;

    toggleUpdate(_id, payload);
  };

  return (
    <form>
      <label htmlFor="qnty">
        Quantity
        <input type="number" name="quantity" defaultValue={quantity} id="qnty" />
      </label>
      <label htmlFor="prc">
        Price
        <input type="number" name="price" defaultValue={price} id="prc" />
      </label>
      <label htmlFor="clt">
        Cient
        <input type="text" name="client" defaultValue={client.name} id="clt" />
      </label>
      <label htmlFor="prdt">
        Product Name
        <input type="text" name="product" defaultValue={product.name} id="prdt" />
      </label>
      <label htmlFor="status">
        Status
        <input type="checkbox" name="active" defaultChecked id="status" />
      </label>
      <button type="submit" onClick={handleSubmit}>Save</button>
      <button type="button" onClick={() => resetStates()}>Cancel</button>
    </form>
  );
};

Form.propTypes = {
  currentDoc: PropTypes.object,
  isUpdate: PropTypes.bool,
}.isRequired;

export default Form;
