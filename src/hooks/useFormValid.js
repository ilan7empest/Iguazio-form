import { useEffect, useState } from 'react';

export const useFormValid = (fieldValid) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const formValid =
      Object.values(fieldValid).every((field) => field) && fieldValid;
    setIsValid(formValid);
  }, [fieldValid]);

  return isValid;
};
