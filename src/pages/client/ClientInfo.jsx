import React, { useState , useContext , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "../../App.jsx";

const ClientInfo = () => {
  const [clientInfoForm, setClientInfoForm] = useState({
    fullname: "",
    phoneNumber: "",
    shippingAddress: "",
    creditCardNumber: "",
    paypalEmail: "",
    edahabiaNumber: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("visa");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setClientInfoForm({
      ...clientInfoForm,
      [e.target.name]: e.target.value,
    });
  };

  const { serverUrl, userRole } = useContext(App.context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let updatedForm
    if(paymentMethod==='visa') updatedForm = {...clientInfoForm , edahabiaNumber:"" , paypalEmail:""}
    if(paymentMethod==='edahabia') updatedForm = {...clientInfoForm , creditCardNumber:"" , paypalEmail:""}
    if(paymentMethod==='paypal') updatedForm = {...clientInfoForm , edahabiaNumber:"" , creditCardNumber:""}
    else updatedForm = clientInfoForm

    console.log(updatedForm)

    try {
      const client  = await axios.post(
        `${serverUrl}/api/v1/auth/register/client`,
         updatedForm,
        { withCredentials: true }
      );
      console.log(client);
      
      navigate('/client/home')
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (userRole === "seller") navigate("/register/seller");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-background rounded bg-cover bg-no-repeat px-4 sm:px-10 lg:px-8 py-12 ">
      <div className="max-w-xl w-full py-10 px-16 rounded space-y-8 bg-white">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 font-montserrat ">
            Client Information
          </h2>
        </div>
        <form
          className="space-y-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md font-montserrat flex flex-col gap-4">
            <div>
              <label htmlFor="fullname" className="font-semibold text-gray-900">
                Full name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={clientInfoForm.fullname}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="font-semibold text-gray-900">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={clientInfoForm.phoneNumber}
                onChange={handleChange}
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label htmlFor="shippingAddress" className="font-semibold text-gray-900">
                Delivery Address
              </label>
              <input
                id="shippingAddress"
                name="shippingAddress"
                type="text"
                required
                className="input  block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={clientInfoForm.shippingAddress}
                onChange={handleChange}
                placeholder="Your Delivery Address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="text-lg text-gray-500">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              className="w-full mb-4 h-10 pl-3 pr-6 text-lg placeholder-gray-600 border-2 rounded-lg appearance-none focus:shadow-outline font-bold"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="visa">Visa</option>
              <option value="paypal">PayPal</option>
              <option value="edahabia">Edahabia</option>
              <option value="C.O.D">None (C.O.D)</option>
            </select>
          </div>

          {["visa"].includes(paymentMethod) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="creditCardNumber"
                value={clientInfoForm.creditCardNumber}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          )}

          {["edahabia"].includes(paymentMethod) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="edahabiaNumber"
                value={clientInfoForm.edahabiaNumber}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          )}
          

          {paymentMethod === "paypal" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PayPal Email
              </label>
              <input
                type="email"
                name="paypalEmail"
                value={clientInfoForm.paypalEmail}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          )}
          <button type="submit" className="button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientInfo;
