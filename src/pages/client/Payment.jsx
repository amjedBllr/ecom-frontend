import React from 'react'
import { useParams } from 'react-router-dom'
import OrderItem from '../../components/OrderItem';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {

    const { id } = useParams();

    const nav = useNavigate()

    
    //!hna dir request bl id ll cart-items blastha
    const cartItem = {
        clientId:null,
        productI: null,
        quantity: 1,
        size:32,
        color: "white",
        dimension: null
    } 

    const {
        clientId,
        productId,
        quantity,
        size ,
        color,
        dimension 
    } = cartItem ;

    const [order , setOrder] = useState({
        clientId: clientId ,
        productId: productId ,
        shippingAddress:'',
        paymentMethod: '',
        quantity:quantity,
        size:size,
        color:color,
        dimension:dimension,
    }) 

    const formHandler = (e) => {
        const { name, value } = e.target;
        setOrder(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
        console.log(order)
    };
    
    const confirmHandler = (e) => {
        //!dir request llserver bl axios takhdm fiha order
        //!zid wahda tnhi biha l cart item
        nav('/client/home')
    };

    const cancelHandler = (e) => {
        nav('/client/home')
    };
    

    let paymentMethodForm = ''

    if (['creditCard', 'paypal', 'edahabia'].includes(order.paymentMethod)){
        paymentMethodForm = 
        <>
            <label className='l1'>Credit card number :</label>
            <input type='text'/>
            <label className='l1'>Expiry month :</label>
            <input type='text'/>
            <label className='l1'>CCV :</label>
            <input type='text'/>
        </>
            
    }


  return (
    <div id='payment-container'>
        <div className="payment-card">
            <div className='recap'>
                    <OrderItem productId={order.productId}/>
                    <h3 className="total-price">Your total is : <span>25500 DA</span> </h3>
            </div>
            <hr/>
            <form method='POST'>
                <label className='l1' htmlFor="shippingAddress">Shipping address :</label>
                <input onChange={formHandler} value={order.shippingAddress} type='text' name='shippingAddress' id='shippingAddress'/>
                <label className='l1' htmlFor="paymentMethod">Payment method :</label>
                <br/>
                <div className='method'>
                <div>
                    <input onChange={formHandler} type='radio' id='creditCard' value='creditCard' name='paymentMethod'/>
                    <label className='l2' htmlFor='creditCard'>Credit card</label>
                </div>
                <div>
                    <input onChange={formHandler} type='radio' id='paypal' value='paypal' name='paymentMethod'/>
                    <label className='l2' htmlFor='paypal'>Paypal</label>
                </div>
                <div>
                    <input onChange={formHandler} type='radio' id='edahabia' value='edahabia' name='paymentMethod'/>
                    <label className='l2' htmlFor='edahabia'>Edahabia</label>
                </div>
                <div>
                    <input onChange={formHandler} type='radio' id='cod' value='cod' name='paymentMethod'/>
                    <label className='l2' htmlFor='cod'>C.O.D <span>(on Delivery)</span></label>
                </div>
            </div>      
            <br/><br/>

            {paymentMethodForm}
            
            <br/><br/><br/>
            <button onClick={ confirmHandler } className='confirm-btn'>Confirm</button>
            <button onClick={ cancelHandler } className='cancel-btn'>Cancel</button>

            </form>
        </div>
    </div>
  )
}

export default Payment