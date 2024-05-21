import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useContext , useState} from 'react';
import App from '../../App.jsx'
import Loading from '../../components/Loading';

function Payment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cartItem, setCartItem] = useState({});
    const [order, setOrder] = useState({});
    const [product, setProduct] = useState({});

    const {serverUrl} = useContext(App.context)

    useEffect(() => {
        async function fetchData() {
            try {
                const item = await axios.get(`${serverUrl}/api/v1/cart-items/${id}`, { withCredentials: true });
                const product = await axios.get(`${serverUrl}/api/v1/products/${item.data.data.productId}`);

                setCartItem(item.data.data);
                setProduct(product.data.data);

                const { clientId, productId, quantity, size, color, dimension } = item.data.data;

                setOrder({
                    clientId,
                    productId,
                    shippingAddress: '',
                    paymentMethod: '',
                    quantity,
                    size,
                    color,
                    dimension,
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    const formHandler = (e) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const confirmHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverUrl}/api/v1/orders`, order, { withCredentials: true });
            const del = await axios.delete(`${serverUrl}/api/v1/cart-items/${id}`, { withCredentials: true });
            console.log(del)
            navigate('/client/cart');
        } catch (error) {
            console.log(error);
        }
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        navigate('/client/home');
    };

    let paymentMethodForm = '';
    if (['creditCard', 'paypal', 'edahabia'].includes(order.paymentMethod)) {
        paymentMethodForm = (
            <>
                <label className='l1'>Credit card number :</label>
                <input type='text' />
                <label className='l1'>Expiry month :</label>
                <input type='text' />
                <label className='l1'>CCV :</label>
                <input type='text' />
            </>
        );
    }

    return (
        <>
            {product.photos && product.photos[0] ? (
                <Suspense fallback={<Loading />}>
                    <div id='payment-container'>
                        <div className="payment-card">
                            <div className='recap'>
                                <div className='item'>
                                    {product.photos && <img src={product.photos[0]} alt="Product" />}
                                    <div className="disc">
                                        <h4 className='name'>{product.name || 'Product'}</h4>
                                        {order.size && <p className='size'><span>Size : </span>{order.size}</p>}
                                        {order.color && <p className='color'><span>Color : </span>{order.color}</p>}
                                        {order.dimension && <p className='dim'><span>Dimension : </span>{order.dimension}"</p>}
                                        <div className='q-p'>
                                            <p className='qnt'><span>Quantity : </span>x{order.quantity}</p>
                                            <h3 className="price"><span>Price : </span>{product.price} DA</h3>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="total-price">Your total is : <span>{order.quantity * product.price} DA</span></h3>
                            </div>
                            <hr />
                            <form method='POST' onSubmit={confirmHandler}>
                                <label className='l1' htmlFor="shippingAddress">Shipping address :</label>
                                <input onChange={formHandler} value={order.shippingAddress} type='text' name='shippingAddress' id='shippingAddress' />
                                <label className='l1' htmlFor="paymentMethod">Payment method :</label>
                                <br />
                                <div className='method'>
                                    <div>
                                        <input onChange={formHandler} type='radio' id='creditCard' value='creditCard' name='paymentMethod' />
                                        <label className='l2' htmlFor='creditCard'>Credit card</label>
                                    </div>
                                    <div>
                                        <input onChange={formHandler} type='radio' id='paypal' value='paypal' name='paymentMethod' />
                                        <label className='l2' htmlFor='paypal'>Paypal</label>
                                    </div>
                                    <div>
                                        <input onChange={formHandler} type='radio' id='edahabia' value='edahabia' name='paymentMethod' />
                                        <label className='l2' htmlFor='edahabia'>Edahabia</label>
                                    </div>
                                    <div>
                                        <input onChange={formHandler} type='radio' id='cod' value='cod' name='paymentMethod' />
                                        <label className='l2' htmlFor='cod'>C.O.D <span>(on Delivery)</span></label>
                                    </div>
                                </div>
                                <br /><br />
                                {paymentMethodForm}
                                <br /><br /><br />
                                <button type="submit" className='confirm-btn'>Confirm</button>
                                <button onClick={cancelHandler} className='cancel-btn'>Cancel</button>
                            </form>
                        </div>
                    </div>
                </Suspense>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Payment;
