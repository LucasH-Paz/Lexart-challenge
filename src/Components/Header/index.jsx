import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ setIsEditing, isEditing }) => (
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

Header.propTypes = {
  setIsEditing: PropTypes.objectOf(PropTypes.func),
  isEditing: PropTypes.bool,
}.isRequired;

export default Header;
