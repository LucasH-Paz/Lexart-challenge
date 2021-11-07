/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { updateItem, newItem } from '../../Services/network';
import './styles.css';

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
    const { data: { _id: ID, ...infos } } = await newItem(payload);
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
      <label htmlFor="qnty" className="label">
        Quantity
        <input
          type="number"
          name="quantity"
          defaultValue={quantity}
          id="qnty"
          className="input"
        />
      </label>
      <label htmlFor="prc" className="label">
        Price
        <input
          type="number"
          name="price"
          defaultValue={price}
          id="prc"
          className="input"
        />
      </label>
      <label htmlFor="clt" className="label">
        Cient
        <input
          type="text"
          name="client"
          defaultValue={client.name}
          id="clt"
          className="input"
        />
      </label>
      <label htmlFor="prdt" className="label">
        Product Name
        <input
          type="text"
          name="product"
          defaultValue={product.name}
          id="prdt"
          className="input"
        />
      </label>
      <label htmlFor="status" className="label">
        <input
          type="checkbox"
          name="active"
          defaultChecked
          id="status"
          className="checkbox"
        />
        {'  Active'}
      </label>
      <button type="submit" onClick={handleSubmit} className="button is-success">
        Save
      </button>
      {'  '}
      <button type="button" onClick={() => resetStates()} className="button is-danger">
        Cancel
      </button>
    </form>
  );
};

Form.propTypes = {
  currentDoc: PropTypes.object,
  isUpdate: PropTypes.bool,
}.isRequired;

export default Form;
