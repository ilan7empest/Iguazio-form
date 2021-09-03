import React, { useState, useEffect } from 'react';

import { useGlobalFormContext } from '../../../context/formContext';

const Checkbox = (props) => {
  const { options, model, required, defaultValue, label } = props;

  const [selectedOptions, setSelectedOptions] = useState([]);

  const { handleOnInit, handleOnChange } = useGlobalFormContext();

  const handleSelect = (e) => {
    const { checked, value } = e.target;

    let updatedState = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    setSelectedOptions(() => {
      return updatedState;
    });
    handleOnChange({ name: model, value: updatedState });
  };

  const initDefaultValue = () => {
    handleOnInit(
      {
        name: model,
        value: defaultValue,
      },
      required
    );
    if (defaultValue) {
      setSelectedOptions(defaultValue);
    }
  };

  useEffect(() => {
    initDefaultValue();
  }, []);

  return (
    <div className='mb-3'>
      <div className='checkbox'>
        <label className='form-label'>{label}</label>
        {options.map(({ label, value }) => {
          return (
            <div className='form-check form-check-inline' key={value}>
              <input
                className='form-check-input'
                type='checkbox'
                id={value}
                value={value}
                checked={selectedOptions.includes(value)}
                onChange={handleSelect}
              />
              <label className='form-check-label' htmlFor={value}>
                {label}
              </label>
            </div>
          );
        })}
        {required && <div className='invalid-feedback d-block'>Required</div>}
      </div>
    </div>
  );
};

export default Checkbox;
