import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ setters, isEditing }) => {
  const { setIsEditing } = setters;
  return (
    <header>
      <h1>ABM Stock</h1>
      <button
        type="button"
        onClick={() => setIsEditing(!isEditing)}
      >
        Add new item
      </button>
    </header>
  );
};

Header.propTypes = {
  setters: PropTypes.objectOf(PropTypes.func),
  isEditing: PropTypes.bool,
}.isRequired;

export default Header;
