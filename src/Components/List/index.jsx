/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { deleteItem, getItem } from '../../Services/network';
import './styles.css';

const headers = ['ID', 'Quantity', 'Product Name', 'Price ($)', 'Client', 'Active', ''];

const List = ({ items, setters }) => {
  const {
    setIsEditing, setItems, setCurrentDoc, setIsUpdate, setIsLoading,
  } = setters;

  const onEdit = async (id) => {
    setIsLoading(true);
    const { data } = await getItem(id);
    setIsLoading(false);
    setCurrentDoc(data);
    setIsUpdate(true);
    setIsEditing(true);
  };

  const onDelete = (id) => {
    deleteItem(id);
    const newItems = items.filter(({ _id }) => _id !== id);
    setItems(newItems);
  };

  return (
    <table className="table is-bordered is-striped table is-hoverable is-fullwidth">
      <thead>
        <tr>
          {
            headers.map((header, index) => (
              <th key={`head${index}`}>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <tr key={`row${index}`}>
              {
                Object.values(item).map(
                  (column, idx) => (<td key={`cell${idx}`}>{column.name || column}</td>),
                )
              }
              <td>
                <button
                  type="button"
                  onClick={() => onEdit(item._id)}
                  className="button is-info is-small"
                >
                  Select
                </button>
                {' '}
                <button
                  type="button"
                  onClick={() => onDelete(item._id)}
                  className="button is-danger is-small"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

List.propTypes = {
  items: PropTypes.array,
}.isRequired;

export default List;
