import ProductCard from '../components/ProductCard'
import { data2 } from '../constantes/index';

import axios from 'axios';
import { useEffect , useContext , useState} from 'react';
import App from '../App.jsx'


const Promotion = () => {

  const [products , setProducts] = useState([])
  const {serverUrl} = useContext(App.context)

  useEffect(()=>{
    async function fetchData() {
      try {
          const products = await axios.get(`${serverUrl}/api/v1/products?discount=true&limit=5`);
          setProducts(products.data.data)
          console.log(products.data.data)
      } catch (error) {
          console.log(error);
      }
  }
  fetchData();
  },[])


  return (
    <section className=" padding-x py-2 my-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-montserrat font-medium" >Discounts</h1>
            <a href="/" className="text-lg"> See All <img className="inline h-[12px]" src="../../public/icons/arrow_left.svg" /> </a> 
          </div>
          <div className="flex gap-2 flex-1 my-4">
          {products.map((product, index) => (
          <ProductCard
            key={index}
            product = {product}
            className="bg-white text-text"
          />
        ))}
            </div>
        </section>
  )
}

export default Promotion