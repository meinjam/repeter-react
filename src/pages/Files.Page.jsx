import axios from 'axios';
import React, { useState } from 'react';

const Files = () => {
  const [inputFields, setInputFields] = useState([{ file: '', file_url: '' }]);

  const addFields = () => {
    let newfield = { file: '', file_url: '' };
    setInputFields([...inputFields, newfield]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputFields);

    let postData = new FormData();
    postData.append('users', JSON.stringify(inputFields));
    inputFields.map((field, i) => {
      let img = field.file;
      postData.append('avatar' + (i + 1), img, img.name);
    });

    // console.log(...postData)

    axios
      .post('https://eoybxw32g2lzz7n.m.pipedream.net', postData)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleFormChange = (i, e) => {
    const img = e.target.files[0];
    const imgLink = URL.createObjectURL(e.target.files[0]);
    const newData = [...inputFields].map((inp, idx) => {
      if (idx === i) {
        return {
          ...inp,
          file: img,
          file_url: imgLink,
        };
      }
      return inp;
    });
    setInputFields(newData);
    // console.log(img);
  };

  return (
    <section className='py-4'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form className='border rounded p-4' onSubmit={handleSubmit}>
              {inputFields?.map((inputField, i) => (
                <div className='mb-3 d-flex align-items-center justify-content-between' key={i}>
                  <div>
                    <label htmlFor={`avatar`} className='form-label'>
                      Select Image
                    </label>
                    <input
                      className='form-control'
                      type='file'
                      id={`avatar`}
                      name='avatar'
                      onChange={(e) => handleFormChange(i, e)}
                    />
                  </div>
                  {inputField.file_url !== '' ? (
                    <img
                      width={100}
                      height={100}
                      src={inputField.file_url}
                      alt=''
                      className='rounded-circle border border-1'
                    />
                  ) : (
                    <img
                      width={100}
                      height={100}
                      src='https://img.icons8.com/color/344/filled-circle.png'
                      alt=''
                      className='rounded-circle border border-1'
                    />
                  )}
                </div>
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

export default Files;
