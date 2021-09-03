import React, { useState, useEffect, useRef } from 'react';
import DropdownItem from './dropdown-item';

import { useGlobalFormContext } from '../../../context/formContext';

import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';

import './dropdown.css';

const Dropdown = (props) => {
  const { defaultValue = '', label, options = [], model, required } = props;
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const [selectedOption, setSelectedValue] = useState({
    value: '',
    label: '',
    name: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const { handleOnInit, handleOnChange } = useGlobalFormContext();

  const handleCloseDD = () => {
    if (!isActive || !isOpen) {
      setIsActive(true);
      setIsOpen(true);
    } else {
      setIsActive(false);
      setIsOpen(false);
    }
  };

  const initDefaultValue = () => {
    const selected = options.find((option) => option.label === defaultValue);
    const updatedOption = {
      name: model,
      value: selected?.value || '',
      label: selected?.label || 'Click to Open',
    };
    setSelectedValue(updatedOption);
    handleOnInit(updatedOption, required);
  };

  const onSelect = (option) => () => {
    const updatedOption = {
      ...selectedOption,
      value: option.value,
      label: option.label,
    };
    setSelectedValue(updatedOption);
    setIsOpen(false);
    handleOnChange(updatedOption);
  };

  useEffect(() => {
    initDefaultValue();
  }, []);

  return (
    <div className='mb-3'>
      <div className='dropdown' ref={dropdownRef}>
        <label className='form-label'>{label}</label>
        <div className='dropdown__header form-control' onClick={handleCloseDD}>
          <span className='dropdown__header_display'>
            {selectedOption.label}
          </span>
          <i
            className={`dropdown__toggle ${
              isOpen && isActive && 'flip-arrow'
            }`}></i>
        </div>
        {required && <div className='invalid-feedback d-block'>Required</div>}

        <ul className={`dropdown-menu ${isOpen && isActive ? 'is-open' : ''}`}>
          {options.map((option) => {
            return (
              <DropdownItem
                key={option.value}
                option={option}
                onSelect={onSelect}
                selectedOption={selectedOption}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
