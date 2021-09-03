import { createContext, useContext, useState } from 'react';

import { useFormValid } from '../utils/useFormValid';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [form, setform] = useState({});
  const [errors, setErrors] = useState({});
  const [fieldValid, setFieldValid] = useState({});

  const isFormValid = useFormValid(fieldValid);

  const updateForm = (el) => {
    const { name, value } = el;
    setform((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value || '',
      };
      return updatedForm;
    });
  };

  const updateFieldValidation = (el, isValid = false) => {
    const { name } = el;
    setFieldValid((prev) => {
      let updated = {
        ...prev,
        [name]: isValid,
      };
      return updated;
    });
  };

  const handleOnInit = (elObj, required = false) => {
    updateForm(elObj);
    if (required) {
      const isFieldValid = elObj.value !== '' || elObj.value.length > 0;
      updateFieldValidation(elObj, isFieldValid);
    }
  };

  const handleOnChange = (el) => {
    updateForm(el);
    if (fieldValid.hasOwnProperty(el.name)) {
      let isFieldValid = false;
      if (Array.isArray(el.value)) {
        if (el.value.length > 0) {
          isFieldValid = true;
        }
      } else {
        isFieldValid = el.value !== '';
      }
      updateFieldValidation(el, isFieldValid);
    }
  };

  const handleOnInput = (e, validators) => {
    const { name, value } = e;
    const errorsArr = [];

    for (let validator of validators) {
      const [isValid, message] = validator(value);
      errorsArr.push([isValid, message]);
    }

    let isFieldValid = errorsArr.every(([isValid, _]) => isValid);

    updateForm(e);

    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: errorsArr };
    });

    if (fieldValid.hasOwnProperty(name)) {
      updateFieldValidation(e, isFieldValid);
    }

    return [isFieldValid, errorsArr];
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const output = {};
    for (let [key, value] of Object.entries(form)) {
      let [main, ...sub] = key.split('.');
      output[main] = sub
        ? {
            ...output[main],
            [sub]: value,
          }
        : value;
    }
    console.log(JSON.stringify(output, null, 2));
    alert(JSON.stringify(output, null, 2));
  };
  return (
    <FormContext.Provider
      value={{
        handleOnInit,
        handleOnInput,
        handleOnChange,
        handleOnSubmit,
        isFormValid,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export const useGlobalFormContext = () => {
  return useContext(FormContext);
};

export default FormProvider;
