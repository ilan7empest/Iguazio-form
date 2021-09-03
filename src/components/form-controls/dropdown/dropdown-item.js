import React from 'react';

const DropdownItem = ({ onSelect, selectedOption, option }) => {
  const { label, value } = option;
  return (
    <li className='dropdown-item' onClick={onSelect(option)} key={value}>
      <span>{label}</span>
      {value === selectedOption.value && <i className='fas fa-check'></i>}
    </li>
  );
};

export default DropdownItem;
