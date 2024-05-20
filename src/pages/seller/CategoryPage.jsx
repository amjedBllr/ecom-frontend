import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import App from '../../App.jsx';

const CategoryPage = () => {
  const { category } = useParams();

  const [cat , setCat] = useState('')
  const [type , setType] = useState(category)
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { serverUrl } = useContext(App.context);
  const resultsRef = useRef(null);

console.log(useParams())
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
    }
  };

  useEffect(() => {
    handleSearch();
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [cat,page]);

  useEffect( () => {
    const fetchData = async ()=>{
      try {
        const cat = await axios.get(`${serverUrl}/api/v1/types/${category}`,{withCredentials:true});
        setCat(cat.data.data.categoryName)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchData()
  }, []);

  return (
    <>
    <div class="title-container w-full bg-orange-400">
      <h1 ref={resultsRef} class="text-3xl font-bold my-8 p-10">
      <span class="title-text text-5xl">{cat}</span><br/><br/>
      <span class="category-label pl-5">{type} :</span>
  </h1>

  <p class="subtitle text-lg font-medium mt-2">
    </p>
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
        >prev page</button>
        <p className="font-semibold">{page}</p>
        <button
          onClick={() => {
            setPage(prev => prev + 1);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >next page</button>
      </div>
    </>
  );
};

export default CategoryPage;
