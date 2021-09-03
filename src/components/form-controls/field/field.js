import React from 'react';

import Dropdown from '../dropdown/dropdown';
import Input from '../input/input';
import Checkbox from '../checkbox.js/checkbox';
import Textarea from '../textarea/textarea';

const Field = (props) => {
  const { type = 'text' } = props;
  switch (type) {
    case 'text':
    case 'password':
    case 'number':
    case 'email':
      return <Input type={type} {...props} />;
    case 'checkbox':
      return <Checkbox type={type} {...props} />;
    case 'select':
      return <Dropdown {...props} />;
    case 'textarea':
      return <Textarea {...props} />;
    default:
      return <Input type={type} {...props} />;
  }
};

export default Field;
