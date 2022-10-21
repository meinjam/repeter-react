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
        setInputFields([{ file: '', file_url: '' }]);
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

  const handleRemoveSingle = (i) => {
    // console.log(i);
    const newItems = [...inputFields].filter((item, idx) => idx !== i);
    // console.log(newItems);
    setInputFields(newItems);
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
                    <input
                      className='custom-file-input'
                      type='file'
                      id={`avatar`}
                      name='avatar'
                      onChange={(e) => handleFormChange(i, e)}
                      style={{
                        backgroundImage: inputField.file_url !== '' ? `url('${inputField.file_url}')` : '',
                      }}
                    />
                  </div>
                  <button
                    type='button'
                    className='btn-close btn-close-danger'
                    onClick={() => handleRemoveSingle(i)}
                    disabled={i === 0 ? 'disabled' : ''}
                  />
                </div>
              ))}
              <button type='button' className='btn btn-secondary btn-sm' onClick={addFields}>
                Add More
              </button>
              <br />
              <button type='submit' className='btn btn-success mt-4'>
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
