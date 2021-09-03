export const formData = [
  {
    label: 'Runtime',
    type: 'select',
    defaultValue: 'Python 3.9',
    model: 'specs.runtime',
    options: [
      {
        label: 'Go',
        value: 'golang',
      },
      {
        label: 'Java',
        value: 'java',
      },
      {
        label: 'NodeJs',
        value: 'nodejs',
      },
      {
        label: 'Python 3.7',
        value: 'python:3.7',
      },
      {
        label: 'Python 3.9',
        value: 'python:3.9',
      },
    ],
  },
];
