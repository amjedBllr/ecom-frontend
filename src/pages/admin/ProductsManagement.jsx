import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import App from '../../App';
import ProductManagementCard from "../../components/Admin/ProductManagementCard.jsx";

const ProductsManagement = () => {
  const [searchByNameInput, setSearchByNameInput] = useState("");

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const { serverUrl } = useContext(App.context);

  const handleSearchByName = (e) => {
    setSearchByNameInput(e.target.value);

  };


  const fetchProductsByName = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/products/?name=${searchByNameInput}`, {
        withCredentials: true
      });
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/products`, {
          params: {
            page
          },
          withCredentials: true
        });
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serverUrl, page]);

  return (
    <div>
      <div id="seller-orders">
        <div className="title">
          <h2>
            Products Management
            <br />
            <span>(Consulting and Deleting)</span>
          </h2>
        </div>
        <hr className="w-full outline-none my-4 opacity-80" />
        <div className="flex justify-between gap-12 px-40 w-[90%]">
          <div className="flex gap-4 items-center">
            <label className="font-bold text-2xl text-nowrap">
              Search by name
            </label>
            <input
              type="text"
              name="SearchByName"
              className="product-input w-[200px]"
              placeholder="Search by name"
              onChange={handleSearchByName}
            />
            <button className="button px-4 py-2" onClick={fetchProductsByName}>Search by Name</button>
          </div>
        </div>
        <div className="relative">
          <div className="orders mt-12">
            <div className="w-[95%] mb-[-20px]">
              <div className="grid grid-cols-10 w-[100%] my-4 pl-12">
                <p className="col-span-4 ml-4">Product</p>
                <p className="col-span-1 ml-4">Seller</p>
                <p className="col-span-5 ml-4 text-center">Management</p>
              </div>
              <hr className="w-full outline-none border-blue-500 my-4 opacity-80" />
            </div>
            {products.map((product) => {
              return <ProductManagementCard key={product._id} product={product} />;
            })}
            <br/><br/><br/>
            <div className="h-full flex justify-center items-center gap-10">
        <button
          onClick={() => {
            setPage(prev => Math.max(prev - 1, 1));
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Prev Page
        </button>
        <p className="font-semibold">{page}</p>
        <button
          onClick={() => {
            setPage(prev => prev + 1);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
