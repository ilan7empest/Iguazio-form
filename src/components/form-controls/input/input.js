import React, { useState, useEffect, useRef } from 'react';
import { useGlobalFormContext } from '../../../context/formContext';
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';
import './input.css';

const Input = ({
  type,
  label,
  model,
  defaultValue,
  placeholder,
  validation,
  required,
}) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { handleOnInit, handleOnInput } = useGlobalFormContext();

  const [isActive, setIsActive] = useDetectOutsideClick(inputRef, false);

  const handleCloseDD = () => {
    if (!isActive || !isOpen) {
      setIsActive(true);
      setIsOpen(true);
    } else {
      setIsActive(false);
      setIsOpen(false);
    }
  };

  const onInput = (e) => {
    setValue(e.target.value);
    const [isFieldValid, errorsArr] = handleOnInput(e.target, validation);
    setIsValid(isFieldValid);
    setErrors(errorsArr);
    setIsActive(true);
    setIsOpen(true);
  };

  const initDefaultValue = () => {
    handleOnInit(
      {
        name: model,
        value: defaultValue || '',
      },
      required
    );
    if (defaultValue) {
      const [isFieldValid, errorsArr] = handleOnInput(
        {
          name: model,
          value: defaultValue,
        },
        validation
      );
      setValue(defaultValue || '');
      setIsValid(isFieldValid);
      setErrors(errorsArr);
    }
  };

  useEffect(() => {
    initDefaultValue();
  }, []);

  const renderErrors = errors.map(([valid, message], idx) => {
    return (
      <li className='dropdown-item' key={idx}>
        <span>{message}</span>
        <i
          className={`fas fa-${
            valid ? 'check text-success' : 'times text-danger'
          }`}></i>
      </li>
    );
  });

  return (
    <div className='mb-3'>
      <div className='input position-relative' ref={inputRef}>
        <label htmlFor={model} className='form-label'>
          {label}
        </label>
        <div className='with-icon position-relative'>
          <input
            type={type}
            className={`form-control ${!isValid && value && 'invalid'}`}
            id={model}
            placeholder={placeholder}
            value={value}
            name={model}
            onChange={onInput}
            autoComplete='off'
          />
          {value && (
            <i
              className={`fas fa-${
                isValid ? 'check text-success' : 'times text-danger'
              }`}
              onClick={handleCloseDD}></i>
          )}
        </div>
        {required && <div className='invalid-feedback d-block'>Required</div>}
        {isOpen && errors?.length > 0 && isActive && value && (
          <ul className={`dropdown-menu ${isOpen ? 'is-open' : ''}`}>
            {renderErrors}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Input;
