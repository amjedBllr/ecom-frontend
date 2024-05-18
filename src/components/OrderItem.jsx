import React from 'react'
import { useEffect , useState } from 'react';
import axios from 'axios';

function OrderItem(props) {

  let [product,setProduct] = useState({})

  useEffect(
    ()=>{
      async function fetchData(){
          try {
              
              
              
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

  )
}

export default OrderItem