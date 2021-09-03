import React, { useState, useEffect } from 'react';
import { useGlobalFormContext } from '../../../context/formContext';

const Textarea = (props) => {
  const { model, label, placeholder, required, defaultValue } = props;
  const { handleOnInit, handleOnChange } = useGlobalFormContext();

  const [value, setValue] = useState('');

  const initDefaultValue = () => {
    handleOnInit(
      {
        name: model,
        value: defaultValue || '',
      },
      required
    );
    if (defaultValue) {
      setValue(defaultValue);
    }
  };

  useEffect(() => {
    initDefaultValue();
  }, []);

  const onInput = (e) => {
    setValue(e.target.value);
    handleOnChange({
      name: model,
      value: e.target.value,
    });
  };
  return (
    <div className='mb-3'>
      <div className='textarea'>
        <label htmlFor={model} className='form-label'>
          {label}
        </label>
        <textarea
          className='form-control'
          id={model}
          placeholder={placeholder}
          value={value}
          name={model}
          onChange={onInput}
          autoComplete='off'
        />
        {required && <div className='invalid-feedback d-block'>Required</div>}
      </div>
    </div>
  );
};

export default Textarea;
