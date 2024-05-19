import React from 'react';
import ProductCard from './../../components/ProductCard2';
import { useState , useEffect , useContext} from "react";
import App from '../../App';
import { FaUserCircle } from "react-icons/fa";
import AddProduct from '../../components/AddProduct';
import axios from 'axios';

const SellerStore = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products , setProducts] = useState([])
    const [seller , setSeller] = useState({})

    const {userinfo} = useContext(App.context)

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      useEffect(() => {
        async function fetchData() {
            try {
                setSeller(userinfo.seller_info)
                const products = await axios.get(`http://localhost:3000/api/v1/sellers/${userinfo.seller_info._id}/products`, { withCredentials: true });
                setProducts(products.data.data)
                console.log(products.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    let productCards = products.map((p)=>{
        return(
        <ProductCard 
            key ={p._id}
            product={p}
            seller={seller}
            />
        )
    })

    return (
        <div id='seller-store'>
            <section id='store-info'>
                <h2>Store information</h2>
                <hr/>
                <div className="seller-card">
                    <img src={userinfo.user_info.pfp||'/images/pfp_placeholder.jpg'} />
                    <div>
                        <h4 className="name">{seller.businessName||"proccessing..."} <span>{seller.sellerStatus||"proccessing..."}</span></h4>
                        <p className="type">{seller.sellerType||"proccessing..."}</p>
                        <p className="rating">Rating: 10/10 <span className='type'>(0 person)</span></p>
                        <p className="email">{seller.businessEmail||"proccessing..."} ~ {seller.businessPhone||"proccessing..."} </p>
                    </div>
                </div>
            </section>
            <section id='store-prod'>
                <h2>Products</h2>
                <button onClick={openModal}>Add product  +</button>
                {isModalOpen && (<AddProduct closeModal={closeModal}/>)}
                <hr/>
                <div className='products'>
                    {/* Corrected props */}
                    {productCards}
                </div>
            </section>
        </div>
    );
};

export default SellerStore;
