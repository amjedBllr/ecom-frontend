import React from 'react'

function OrderItem(props) {

  const id = props.productId ;
  //! mba3d dir request

  const {size , color , dimension} = {
    size : 24 , color : 'White'
  } //! riglha bl request mb3d

  return (
    <div className='item'>
        <img src="https://s.alicdn.com/@sc04/kf/H8e10e738b2da4bc0b938e6f5b113d9c0Y.jpg" />
        <div className="disc">
            <h4 className='name'>Shoes for men</h4>
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