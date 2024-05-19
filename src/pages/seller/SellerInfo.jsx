import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import App from "../../App.jsx";

const SellerInfo = () => {
  const [sellerInfoForm, setSellerInfoForm] = useState({
    sellerType: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    businessAddress: "",
    identityCard: null,
    commerceRegisterNumber: "",
    creditCardActivity: false,
    paypalActivity: false,
    edahabiaActivity: false,
    creditCardNumber: "",
    paypalEmail: "",
    edahabiaNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
  });

  const navigate = useNavigate();

  const handleSellerTypeChange = (type) => {
    setSellerInfoForm((prevState) => ({
      ...prevState,
      sellerType: type,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setSellerInfoForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [message, setMessage] = useState("");

  const { serverUrl, userRole } = useContext(App.context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!sellerInfoForm.sellerType) {
      setMessage("Seller Type is required.");
      return;
    }
    if (!sellerInfoForm.businessName) {
      setMessage("Business Name is required.");
      return;
    }
    if (!sellerInfoForm.businessPhone) {
      setMessage("Business Phone Number is required.");
      return;
    }
    if (!sellerInfoForm.businessEmail) {
      setMessage("Business Email is required.");
      return;
    }
    if (!sellerInfoForm.businessAddress) {
      setMessage("Business Address is required.");
      return;
    }
    if (!sellerInfoForm.commerceRegisterNumber) {
      setMessage("Commerce Register Number is required.");
      return;
    }
    if (!sellerInfoForm.identityCard) {
      setMessage("Identity Card is required.");
      return;
    }

    if (["visa", "edahabia"].includes(paymentMethod) && !cardInfo.cardNumber) {
      setMessage("Card Number is required.");
      return;
    }

    if (paymentMethod === "paypal" && !sellerInfoForm.paypalNumber) {
      setMessage("PayPal Email is required.");
      return;
    }

    const updatedForm = { ...sellerInfoForm };
    if (paymentMethod === "visa") {
      updatedForm.paypalEmail = ""
      updatedForm.creditCardNumber = cardInfo.cardNumber;
      updatedForm.creditCardActivity = true;
    } else if (paymentMethod === "edahabia") {
      updatedForm.paypalEmail = ""
      updatedForm.edahabiaNumber = cardInfo.cardNumber;
      updatedForm.edahabiaActivity = true;
    } else if (paymentMethod === "paypal") {
      updatedForm.paypalEmail = ""
      updatedForm.paypalActivity = true;
    }

    try {
      const formData = new FormData();
      Object.keys(updatedForm).forEach((key) => {
        formData.append(key, updatedForm[key]);
      });
      formData.append("identityCard", sellerInfoForm.identityCard);

      const seller = await axios.post(
        `${serverUrl}/api/v1/auth/register/seller`,
        formData,
        { withCredentials: true }
      );
      console.log(seller);
      navigate('/seller/home/store')
    } catch (error) {
      setMessage("An error occurred while submitting the form. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (userRole === "client") navigate("/register/client");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-background rounded bg-cover bg-no-repeat px-4 sm:px-10 lg:px-8 py-12">
      <div className="max-w-xl w-full py-10 px-16 rounded space-y-8 bg-white">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 font-montserrat">
            Seller Information
          </h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="rounded-md font-montserrat flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="label">Type</label>
              <div>
                <button
                  type="button"
                  className={`px-8 py-4 font-semibold font-montserrat mr-2 border-2 ${
                    sellerInfoForm.sellerType === "company"
                      ? "border-[#607D8B] border-[3px]"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSellerTypeChange("company")}
                >
                  Company
                </button>
                <button
                  type="button"
                  className={`px-8 py-4 font-semibold font-montserrat mr-2 border-2 ${
                    sellerInfoForm.sellerType === "individual"
                      ? "border-[#607D8B] border-[3px]"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSellerTypeChange("individual")}
                >
                  Individual
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="businessName" className="label">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={sellerInfoForm.businessName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="businessPhone" className="label">
                Business Phone Number
              </label>
              <input
                id="businessPhone"
                name="businessPhone"
                type="text"
                required
                className="input"
                value={sellerInfoForm.businessPhone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="businessEmail" className="label">
                Business Email
              </label>
              <input
                id="businessEmail"
                name="businessEmail"
                type="email"
                required
                className="input"
                value={sellerInfoForm.businessEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="businessAddress" className="label">
                Business Address
              </label>
              <input
                id="businessAddress"
                name="businessAddress"
                type="text"
                required
                className="input"
                value={sellerInfoForm.businessAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="label">
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
            {["visa", "edahabia"].includes(paymentMethod) && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardInfo.cardNumber}
                  onChange={handleCardInfoChange}
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
                  name="paypalNumber"
                  value={sellerInfoForm.paypalEmail}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="commerceRegisterNumber" className="label">
              Commerce Register Number
            </label>
            <input
              id="commerceRegisterNumber"
              name="commerceRegisterNumber"
              type="text"
              required
              className="input"
              value={sellerInfoForm.commerceRegisterNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="identityCard" className="label">
              Seller ID
            </label>
            <div className="mt-4 relative">
              <input
                id="identityCard"
                name="identityCard"
                type="file"
                required
                className="input absolute opacity-0 w-full h-full cursor-pointer"
                onChange={handleChange}
              />
              <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded px-4 py-2 cursor-pointer">
                <FaPlus className="mr-2" />
                <span>{sellerInfoForm.identityCard ? sellerInfoForm.identityCard.name : "Add File"}</span>
              </div>
            </div>
          </div>
          <br />
          <p className="text-red-500 ml-2">{message}</p>
          <br />
          <button type="submit" className="button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerInfo;
