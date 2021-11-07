/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { deleteItem } from '../../Services/network';

const headers = ['ID', 'Quantity', 'Product Name', 'Price ($)', 'Client', 'Active', ''];

const List = ({ items, setters }) => {
  const {
    setIsEditing, setItems, setCurrentDoc,
  } = setters;

  const onEdit = (currentDoc) => {
    setCurrentDoc(currentDoc);
    setIsEditing(true);
  };

  const onDelete = (id) => {
    deleteItem(id);
    const newItems = items.filter(({ _id }) => _id !== id);
    setItems(newItems);
  };

  return (
    <table>
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
                  onClick={() => onEdit(item)}
                >
                  Select
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item._id)}
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
