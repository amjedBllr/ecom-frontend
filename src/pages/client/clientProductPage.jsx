import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaShoppingCart, FaStar, FaChevronDown } from "react-icons/fa";
import ReactStarsRating from "react-rating-stars-component";
import { useLocation , useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../../App.jsx'


const ClientProductPage = () => {
  
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [dimension, setDimension] = useState("");
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message , setMessage] = useState("")

  const [product , setProduct] = useState({})
  const [seller , setSeller ] = useState({})
  const [reviews , setReviews] = useState([])
  const [rate , setRate] = useState(0)
  const [addMessage , setAddMessage] = useState("")

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    const reviewDateTime = `${formattedDate} ${formattedTime}`;
  
    const review = {
      productId: id,
      fullname: userinfo.client_info.fullname ,
      rating: rating,
      comment: comment,
      reviewDate: reviewDateTime,
    }
    if(comment===""){
      setMessage("you have not write any comment !!")
      return ;
    }
    try {
      const rev = await axios.post(`${serverUrl}/api/v1/reviews`,review, { withCredentials: true });
      console.log(rev)
      setMessage("comment was added !!")
    } catch (error) {
      console.log(error);
  }

  };
  


  const addToCart = async (e) => {
    e.preventDefault();
    setAddMessage("proccessing...")
    const cartItem = {
      productId: id,
      quantity: quantity,
      size: size,
      color: color,
      dimension: dimension,
    }
    try {
      const item = await axios.post(`${serverUrl}/api/v1/cart-items`,cartItem,{withCredentials:true});
      console.log(item)
      setAddMessage("product was added to cart !!")
    } catch (error) {
      console.log(item)
      setAddMessage("Failed adding product to cart :'(")
    }
    
  };



  const id = useParams().id
  
  const {serverUrl , userinfo} = useContext(App.context)

  useEffect(()=>{
    async function fetchData() {
      try {
          const product = await axios.get(`${serverUrl}/api/v1/products/${id}`,{withCredentials:true});
          setProduct(product.data.data)
          const sellerId = product.data.data.sellerId
          const seller = await axios.get(`${serverUrl}/api/v1/sellers/${sellerId}`, { withCredentials: true });
          setSeller(seller.data.data)
          const revs = await axios.get(`${serverUrl}/api/v1/products/${id}/reviews`,{withCredentials:true});
          setReviews(revs.data.data)
          let totalRev = 0
          revs.data.data.forEach(element => {
            totalRev += element.rating
          });
          const avRate = totalRev / revs.data.data.length
          setRate(avRate)
      } catch (error) {
          console.log(error);
      }
  }
  fetchData();
  },[])


  return (
    <>
      <div className="max-w-7xl mx-auto px-12 sm:px-6 lg:px-8 py-8 border-2 border-gray-500 rounded-lg mt-10 mb-4">
        <div className="grid items-start grid-cols-2 md:grid-cols-2 gap-16 sm:grid-cols-1 lg:padding-x">
          {/* Image Carousel */}
          <div className="flex flex-col justify-between  gap-11">
            <div className="image-gallery-container">
            </div>
            {/* Comments Section */}
            <form onSubmit={handleCommentSubmit} className="mt-30">
                <img className="product-page-image" src={product.photos}
                />
              <h4 className="font-semibold text-xl">Add a review : </h4>
              <br/>
              <div className="flex items-center">
              <ReactStarsRating
                count={5}
                size={24}
                activeColor="#ffd700"
                value={rating}
                onChange={handleRatingChange}
                isHalf={true}
                emptyIcon={<FaStar />}
                halfIcon={<FaStar />}
                filledIcon={<FaStar />
              }
              />
              <span className="text-gray-600 ml-2">
              ({rating.toFixed(1)})
              </span>
              </div>
              <br/>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <br/>
              <p className="text-red-500">{message}</p>
              <br/>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Submit Comment
              </button>
            </form>
          </div>

          {/* Product Details Section */}
          <div className="py-2">
            <h1 className="text-3xl font-bold mb-4 py-4">{product.productName}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
            <ReactStarsRating
              count={5}
              size={16}
              activeColor="#ffd700"
              value={rate}
              edit={false}
              isHalf={true}
              emptyIcon={<FaStar />}
              halfIcon={<FaStar />}
              filledIcon={<FaStar />}
            />
            <span className="text-gray-600 ml-2">
              ({rate.toFixed(1)})
            </span>
          </div>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {product.price} DA
            </p>
            <p className="text-gray-600 mb-4">
              Sold by:{" "}
              <span className="font-semibold">{seller.businessName}</span>
            </p>
            <div className="flex flex-wrap items-center mb-4">
              <div className="mr-4 mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
              

              {product.colors && (
  <div className="mr-4 mb-4">
    <label
      htmlFor="color"
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      Color
    </label>
    <div className="relative">
      <select
        id="color"
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-40 px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        <option value="">Select Color</option>
        {product.colors.map((s) => {
          return <option key={s} value={s}>{s}</option>;
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
        <FaChevronDown className="text-gray-500" />
      </div>
    </div>
  </div>
)}

{product.sizes && (
              <div className="mr-4 mb-4">
                <label
                  htmlFor="size"
                  className="block text-sm  font-semibold text-gray-700 mb-1"
                >
                  Size
                </label>
                <div className="relative">
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-40 px-4 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500  appearance-none"
                  >
                    <option value="">Select Size</option>
                    { product.sizes.map(s=>{
                      return(<option key={s} value={s}>{s}</option>)
                    })}

                    {/* Add more size options */}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
             )}
{product.dimensions && (
  <div className="mr-4 mb-4">
    <label
      htmlFor="color"
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      Color
    </label>
    <div className="relative">
      <select
        id="color"
        name="color"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
        className="w-40 px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        <option value="">Select Dimension</option>
        {product.dimensions.map((s) => {
          return <option key={s} value={s}>{s}</option>;
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
        <FaChevronDown className="text-gray-500" />
      </div>
    </div>
  </div>
)}
             </div>

             
            <br/><p className="text-green-500">{addMessage}</p><br/>
            <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
              <FaShoppingCart className="inline-block mr-2" />
              Add to Cart
            </button>
            <div className="border-t border-gray-300 pt-4 mt-4">
              {reviews.length > 0 ? (
                <>
                  <ReviewsSection reviews={reviews} />
                </>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientProductPage;

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="border-t border-gray-300 py-6 mt-4">
      <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="mb-4 pt-4 scroll-m-11">
          <p className="text-gray-700 ">{review.comment}</p>
          <div className="flex items-center mb-2">
            <ReactStarsRating
              count={5}
              size={16}
              activeColor="#ffd700"
              value={review.rating}
              edit={false}
              isHalf={true}
              emptyIcon={<FaStar />}
              halfIcon={<FaStar />}
              filledIcon={<FaStar />}
            />
            <span className="text-gray-600 ml-2">
              ({review.rating.toFixed(1)})
            </span>
          </div>
          <p className="text-gray-500 mt-1 font-semibold">
            By {review.fullname} on {review.reviewDate}
          </p>
        </div>
      ))}
    </div>
  );
};
