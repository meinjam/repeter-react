import React from 'react';

const RepeterItem = ({ inputFiled, index, handleFormChange, handleRemoveSingle }) => {
  return (
    <div>
      <div className='mb-1'>
        <label htmlFor={`fullName${index}`} className='form-label'>
          Full Name
        </label>
        <input
          type='text'
          className='form-control'
          id={`fullName${index}`}
          name='fullName'
          value={inputFiled.fullName}
          onChange={(e) => handleFormChange(index, e)}
        />
      </div>
      <div className='mb-2'>
        <label htmlFor={`address${index}`} className='form-label'>
          Address
        </label>
        <input
          type='text'
          className='form-control'
          id={`address${index}`}
          name='address'
          value={inputFiled.address}
          onChange={(e) => handleFormChange(index, e)}
        />
      </div>
      {/* <div className='mb-3'>
        <label htmlFor={`avatar${index}`} className='form-label'>
          Select Image
        </label>
        <input
          className='form-control'
          type='file'
          id={`avatar${index}`}
          name='avatar'
          value={inputFiled.avatar}
          onChange={(e) => handleFormChange(index, e, true)}
        />
      </div> */}
      <div className='mb-2 d-flex justify-content-end'>
        <button
          type='button'
          className='btn-close btn-close-danger'
          onClick={() => handleRemoveSingle(index)}
          disabled={index === 0 ? 'disabled' : ''}
        />
      </div>
    </div>
  );
};

export default RepeterItem;
