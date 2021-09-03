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
