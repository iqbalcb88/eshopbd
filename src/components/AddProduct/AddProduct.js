import React, { useRef } from 'react';

const AddProduct = () => {
  const nameRef = useRef();
  const detailRef = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const detail = detailRef.current.value;
    const newProduct = { name, detail };
    fetch('http://localhost:5000/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((result) => result.json())
      .then((data) => console.log(data));
  };
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      <h1>Add a Product to Db</h1>
      <form
        className='d-flex justify-content-center flex-column'
        onSubmit={handleAdd}
      >
        <input
          type='text'
          ref={nameRef}
          placeholder='Product Name'
          name=''
          id=''
        />
        <textarea
          name=''
          ref={detailRef}
          placeholder='Product Details'
          id=''
          cols='30'
          rows='3'
        ></textarea>
        <input type='submit' value='AddToDb' name='' id='' />
      </form>
    </div>
  );
};

export default AddProduct;
