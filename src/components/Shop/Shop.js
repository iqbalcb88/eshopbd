import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb } from '../../utilities/fakedb';
import './Shop.css';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart(products);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  // products to be rendered on the UI
  const [displayProducts, setDisplayProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayProducts(data.products);
        const count = data.count;
        const pageCount = Math.ceil(count / 10);
        setPageCount(pageCount);
      });
  }, []);
  const handleDelete = (id) => {
    // console.log(typeof id);
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert('Successfully deleted');
          const remainingProducts = products.filter((p) => p._id !== id);
          setProducts(remainingProducts);
          setDisplayProducts(remainingProducts);
          console.log(remainingProducts.length);
        }
      });
  };

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToDb(product.key);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;

    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayProducts(matchedProducts);
  };

  return (
    <>
      <div className='search-container'>
        <input
          type='text'
          onChange={handleSearch}
          placeholder='Search Product'
        />
      </div>
      <div className='shop-container'>
        <div className='product-container'>
          {displayProducts.map((product) => (
            <Product
              key={product.key}
              product={product}
              handleDelete={handleDelete}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
          <div className='pagination'>
            {[...Array(pageCount).keys()].map((number) => (
              <button
                className={number === page ? 'selected' : ''}
                key={number}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
        <div className='cart-container'>
          <Cart cart={cart}>
            <Link to='/review'>
              <button className='btn-regular'>Review Your Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default Shop;