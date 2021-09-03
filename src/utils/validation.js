// export const checkValidation = (value, validationRules) => {
//   let isValid = true;
//   if (validationRules.required) {
//     isValid = value.trim() !== '' && isValid;
//   }
//   if (validationRules.minLength) {
//     isValid = value.length >= validationRules.minLength && isValid;
//     console.log(isValid);
//   }
//   if (validationRules.maxLength) {
//     isValid = value.length <= validationRules.maxLength && isValid;
//   }
//   if (validationRules.isEmail) {
//     const regex =
//       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//     isValid = regex.test(value) && isValid;
//   }
//   if (validationRules.isNumeric) {
//     const regex = /^\d+$/;
//     isValid = regex.test(value) && isValid;
//   }
//   console.log(isValid);
//   return isValid;
// };

// export const checkValidation = (value, validationRules) => {
//   let isValid = true;
//   let message = "";
//   if (validationRules.rquired) {
//     console.log(validationRules);
//   }
// };

export const required = (value) => {
  let isValid = true;
  isValid = value.trim() !== '' && typeof value === 'string';
  return [isValid, 'Required'];
};

export const pattern = (pattern, label) => (value) => {
  const regex = new RegExp(pattern, 'g');
  let isValid = true;
  isValid = value && regex.test(value) && isValid;
  return [isValid, label];
};

export const maxLength = (pattern, label) => (value) => {
  const regex = new RegExp(pattern, 'g');
  let isValid = true;
  isValid = value && regex.test(value);
  return [isValid, label];
};

export const minLength = (pattern, label) => (value) => {
  const regex = new RegExp(pattern, 'g');
  let isValid = true;
  isValid = value && regex.test(value);
  return [isValid, label];
};

export const validChars = (pattern, label) => (value) => {
  const regex = new RegExp(pattern, 'g');
  let isValid = true;
  isValid = value && !regex.test(value);
  return [isValid, label];
};

export const startsWithChar = (pattern, label) => (value) => {
  const regex = new RegExp(pattern, 'g');
  let isValid = true;
  isValid = value && regex.test(value);
  return [isValid, label];
};
