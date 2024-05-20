
import axios from 'axios';
import { useEffect , useContext , useState} from 'react';
import App from '../App.jsx'
import { useNavigate } from 'react-router-dom';

const ClientOrder = (props) => {
  let [confirmed, setConfirmed] = useState(props.confirmed);
  const [showButtons, setShowButtons] = useState(false);
  
  const {
    _id,
    productId,
    quantity,
    size,
    color,
    dimension,
    totalPrice
  } = props.item ;
  
  const navigate = useNavigate()

  const handleShowButtons = () => {
    if (!confirmed) {
      setShowButtons(!showButtons);
    }
  };
  const handleConfirmPurchase = () => {
    navigate(`/client/payment/${_id}`)
  };

  const handleEditItem = () => {
    // Edit item logic here
  };

  const handleDeleteItem = async () => {
    // Delete item logic here
    try {
      const prod = await axios.delete(`${serverUrl}/api/v1/cart-items/${_id}`,{withCredentials:true});
      if(prod) alert('cart item has been deleted !!')
      console.log(prod.data.data)
  } catch (error) {
      console.log(error);
  }

  };
  
  const [product , setProduct] = useState([])
  const {serverUrl} = useContext(App.context)

  useEffect(()=>{
    async function fetchData() {
      try {
          const prod = await axios.get(`${serverUrl}/api/v1/products/${productId}`);
          setProduct(prod.data.data)
          console.log(prod.data.data)
      } catch (error) {
          console.log(error);
      }
  }
  fetchData();
  },[])

  return (
    <>
      <div
        className=" flex w-[80%] h-[100px] text-white  bg-[#1E1E1E] justify-around  px-4  py-4 items-start rounded-[5px] overflow-hidden"
        onClick={handleShowButtons}
      >
        <div
          className="flex overflow-hidden  items-start gap-[4%]"
          style={{ flex: 2 }}
        >
          <img
            className=" aspect-[1/1] w-[70px] border-[1px] mr-2 border-white rounded-[5px]"
            src={product.photos}
          />
          <div className="flex  flex-col text-white gap-2 pb-2">
            <h4 className="text-[16px] font-[400]">{product.productName}</h4>
            <p className="text-[8px] flex-1">
              {product.description}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Size</p>
          <p className="quant">{size}</p>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Color</p>
          <p className="color">{color}</p>{" "}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Quantity</p>
          <p className="quant">x{quantity}</p>
        </div>
        <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-white ">Dimens</p>
              <p className="quant">{dimension}</p>
            </div>
        </div>

        <div className="flex  flex-1 flex-col gap-2">
          <p className="text-white ">Price</p>
          <p className="color">{product.price} DA</p>{" "}
        </div>

        <div className="flex  flex-1 flex-col gap-2">
          <p className="text-white ">Total Price</p>
          <p className="color">{totalPrice} DA</p>{" "}
        </div>
      </div>
      {showButtons && (
        <div className="flex gap-2">
          <button
            className="button bg-green-600"
            onClick={handleConfirmPurchase}
          >
            Confirm Purchase
          </button>
          <button className="button bg-blue-600" onClick={handleEditItem}>
            Edit Item
          </button>
          <button className="button bg-red-600" onClick={handleDeleteItem}>
            Delete Item
          </button>
        </div>
      )}
    </>
  );
};

export default ClientOrder;
