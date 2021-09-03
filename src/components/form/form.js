import React from 'react';
import Field from '../form-controls/field/field';

import * as validate from '../../utils/validation';

import { useGlobalFormContext } from '../../context/formContext';

const Form = ({ name, title }) => {
  const { handleOnSubmit, isFormValid } = useGlobalFormContext();
  return (
    <form onSubmit={handleOnSubmit} name={name} className='row g-3' noValidate>
      <h4>{title}</h4>
      <div className='col-md-4'>
        <Field
          label='Function Name'
          type='text'
          defaultValue=''
          required
          placeholder='Enter Function Name'
          model='metadata.name'
          validation={[
            validate.required,
            validate.pattern('^[a-z0-9-]*$', 'Valid characters: a-z, 0-9, -'),
            validate.pattern(
              '^[a-z0-9].*[a-z0-9]$',
              'Must begin and end with: a–z, 0–9'
            ),
            validate.pattern('^(?=.{0,56}$).*$', 'Max length: 56'),
          ]}
        />
      </div>
      <div className='col-md-4'>
        <Field
          label='Service name'
          type='text'
          defaultValue=''
          required
          placeholder='Enter Service Name'
          model='spec.serviceName'
          validation={[
            validate.required,
            validate.pattern('^[a-z0-9-]*$', 'Valid characters: a-z, 0-9, -'),
            validate.pattern('^[a-z]', 'Must begin with: a–z'),
            validate.pattern('[a-z0-9]$', 'Must end with: a–z, 0–9'),
            validate.pattern('^(?=.{0,53}$).*$', 'Max length: 53'),
          ]}
        />
      </div>
      <div className='col-md-4'>
        <Field
          type='select'
          defaultValue='Python 3.9'
          label='Runtime'
          model='spec.runtime'
          options={[
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
          ]}
        />
      </div>

      <div className='col-12'>
        <Field
          type='checkbox'
          defaultValue={['read']}
          label='Permissions'
          model='spec.permissions'
          required
          options={[
            {
              label: 'Read files',
              value: 'read',
            },
            {
              label: 'Write files',
              value: 'write',
            },
            {
              label: 'Execute files',
              value: 'execute',
            },
          ]}
        />
      </div>
      <div className='col-12'>
        <Field
          type='checkbox'
          defaultValue={[]}
          label='Categories'
          model='metadata.categories'
          options={[
            {
              label: 'Data Collection',
              value: 'collect',
            },
            {
              label: 'Data Processing',
              value: 'process',
            },
            {
              label: 'Analytics & Reporting',
              value: 'report',
            },
            {
              label: 'Sorting, filtering, tagging',
              value: 'sort',
            },
          ]}
        />
      </div>
      <div className='col-12'>
        <Field
          label='Description'
          type='textarea'
          defaultValue=''
          placeholder='Write something...'
          model='spec.description'
        />
      </div>
      <div className='col-12'>
        <button className='btn btn-primary' disabled={!isFormValid}>
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default Form;
