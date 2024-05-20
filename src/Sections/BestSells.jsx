import ProductCard from "../components/ProductCard";

import axios from 'axios';
import { useEffect , useContext , useState} from 'react';
import App from '../App.jsx'


const BestSells = () => {

  
  const [products , setProducts] = useState([])
  const {serverUrl} = useContext(App.context)

  useEffect(()=>{
    async function fetchData() {
      try {
          const products = await axios.get(`${serverUrl}/api/v1/products?minPrice=5000&maxPrice=10000&limit=5`);
          setProducts(products.data.data)
          console.log(products.data.data)
      } catch (error) {
          console.log(error);
      }
  }
  fetchData();
  },[])


  return (
    <section className="bg-background padding-x py-4 my-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-montserrat font-medium">
          Best Sells
        </h1>
        <a href="/" className="text-lg text-accent ">
          See All
          <img
            className="inline h-[12px] text-accent ml-2"
            src="../../public/icons/arrow_left.svg"
          />
        </a>
      </div>

      <div className="flex gap-2 flex-1 my-4 flexs">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product = {product}
            className="bg-white text-text"
          />
        ))}
      </div>
    </section>
  );
};

export default BestSells;
