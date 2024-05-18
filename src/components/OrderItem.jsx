import React from 'react'
import { useEffect , useState } from 'react';
import axios from 'axios';

function OrderItem(props) {

  let [product,setProduct] = useState({})

  useEffect(
    ()=>{
      async function fetchData(){
          try {
              
              const product = await axios.get(`https://ecom-backend-nv4n.onrender.com/api/v1/products/${props.data.productId}`)
              
              setProduct(product.data.data)
              
          } catch (error) {
              console.log(error)
          }
      }
      fetchData()
  },[]
  )

  const {size , color , dimension} = {
    size : 24 , color : 'White'
  } //! riglha bl request mb3d

  return (
    <div className='item'>
      <img src={product.photo} />
        <div className="disc">
            <h4 className='name'>{product.name}</h4>
            {size ? <p className='size'><span>Size : </span>32</p> : '' }
            {color ? <p className='color'><span>Color : </span>white</p> : '' }
            {dimension ? <p className='dim'><span>Dimension : </span>65"</p> : '' }
            <div className='q-p'>
              <p className='qnt'><span>Quantity : </span>x1</p>
              <h3 className="price"><span>Price : </span>5500 DA</h3>
            </div>
        </div>
        
    </div>
  )
}

export default OrderItem