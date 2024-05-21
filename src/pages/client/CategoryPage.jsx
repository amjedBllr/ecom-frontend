import ProductCard from "../../components/ProductCard.jsx";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import App from '../../App.jsx';
import Loading from "../../components/Loading.jsx";

const CategoryPage = () => {
  const { category } = useParams();
  const [cat, setCat] = useState('');
  const [type, setType] = useState(category);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { serverUrl } = useContext(App.context);
  const resultsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    let query = `?category=${cat}&type=${type}&page=${page}`;

    try {
      const prods = await axios.get(`${serverUrl}/api/v1/products${query}`);
      setProducts(prods.data.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setProducts([]);
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1)
    const fetchCategory = async () => {
      try {
        const catResponse = await axios.get(`${serverUrl}/api/v1/types/${category}`, { withCredentials: true });
        setCat(catResponse.data.data.categoryName);
        setType(category); // Update type to match category
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, [category]);

  useEffect(() => {
    if (cat) {
      handleSearch();
    }
  }, [cat, type, page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="title-container w-full bg-orange-400">
        <h1 ref={resultsRef} className="text-3xl font-bold my-8 p-10">
          <span className="title-text text-5xl">{cat}</span><br /><br />
          <span className="category-label pl-5">{type} :</span>
        </h1>
        <p className="subtitle text-lg font-medium mt-2"></p>
      </div>

      <div className="grid grid-cols-5 gap-x-8 gap-y-8 padding-x sm:flex sm:flex-col my-12">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            className="bg-white text-text"
          />
        ))}
      </div>
      <div className="h-full flex justify-center">
        <p className="text-red-500">{message}</p>
      </div>
      <br />
      <br />
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
    </>
  );
};

export default CategoryPage;
