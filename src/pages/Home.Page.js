import React, { useState } from 'react';
import RepeterItem from '../components/RepeterItem.Component';

const Home = () => {
  const [inputFields, setInputFields] = useState([{ fullName: '', address: '' }]);

  const handleFormChange = (i, e) => {
    let data = [...inputFields];
    data[i][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { fullName: '', address: '' };
    setInputFields([...inputFields, newfield]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const handleRemoveSingle = (i) => {
    // console.log(i);
    let data = [...inputFields];
    data.splice(i, 1);
    setInputFields(data);
  };

  return (
    <section className='py-4'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form className='border rounded p-4' onSubmit={handleSubmit}>
              {inputFields?.map((inputFiled, i) => (
                <RepeterItem
                  key={i}
                  inputFiled={inputFiled}
                  handleFormChange={handleFormChange}
                  index={i}
                  handleRemoveSingle={handleRemoveSingle}
                />
              ))}
              <button type='button' className='btn btn-primary btn-sm' onClick={addFields}>
                Add More
              </button>
              <br />
              <button type='submit' className='btn btn-primary mt-4'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
