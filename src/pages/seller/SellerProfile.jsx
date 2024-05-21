import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../../App.jsx'

const SellerProfile = () => {

  const {userinfo , serverUrl} = useContext(App.context)
  let {_id,email,username,pfp} = userinfo.user_info
  const [accountInformation, setAccountInformation] = useState(
    {
      _id:_id,
      email:email,
      username:username,
      pfp:pfp
    }
  );

  const [image , setImage] = useState(pfp)

  const [accountMessage , setAccountMessage] = useState("")
  const [sellerMessage , setSellerMessage] = useState("")
  const [sellerInformation, setSellerInformation] = useState(userinfo.seller_info);
   
  // handle the changes of the first form Acoonut
  const handleAccountChange = (e) => {
    setAccountInformation({
      ...accountInformation,
      [e.target.name]: e.target.value,
    });
  };
  //handle the Changes of the second Form
  const handleSellerChange = (e) => {
    const { name, checked, value } = e.target;
    const updatedValue = e.target.type === 'checkbox' ? checked : value;
    setSellerInformation((prevSellerInformation) => ({
      ...prevSellerInformation,
      [name]: updatedValue,
    }));
    console.log(sellerInformation)
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      setAccountMessage("proccessing ...")
      const formData = new FormData();
      Object.entries(accountInformation).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (image) {
        formData.append('pfp', image); // Add the image file to FormData
      }
      const user = await axios.patch(`${serverUrl}/api/v1/users/${accountInformation._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the appropriate header for FormData
        },
      });
      console.log(user);
      setAccountMessage("User information was patched successfully !!")
    } catch (error) {
      console.log(error);
      setAccountMessage("Failed to patch user information !!")
    }
  };

  const handleSellerSubmit = async (e) => {
    e.preventDefault();
    console.log(sellerInformation)
    try {
      setSellerMessage("proccessing ...")

      const seller = await axios.patch(`${serverUrl}/api/v1/sellers/${sellerInformation._id}`, sellerInformation, {
        withCredentials: true,
      });
      console.log(seller);
      setSellerMessage("Seller information was patched successfully !!")
    } catch (error) {
      console.log(error);
      setClientMessage("Failed to patch seller information !!")
    }
  };
  // to change the picture of the profile
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccountInformation({
          ...accountInformation,
          pfp: reader.result, // Store the preview URL
           // Store the file object
        });
      };
      reader.readAsDataURL(file);
      setImage(file)
      console.log(image)
    
    }
  
  };
  // handle Changes password
  const changePassword = () => {
    const newPassword = prompt("Enter new password");
    if (newPassword) {
      setAccountInformation({
        ...accountInformation,
        password: newPassword,
      });
    }
  };
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col px-12 py-8 gap-4">
          <h3 className="text-2xl font-bold text-black mb-4">
            Account Information
          </h3>
          <form onSubmit={handleAccountSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex justify-between space-x-4">
              <div className="flex-1">
                <label className="label">Email</label>
                <input
                  name="email"
                  value={accountInformation.email}
                  onChange={handleAccountChange}
                  className="input"
                  disabled
                />
              </div>
              {/* UserName */}
              <div className="flex-1">
                <label className="label">Username</label>
                <input
                  name="username"
                  value={accountInformation.username}
                  onChange={handleAccountChange}
                  className="input"
                />
              </div>
            </div>
            {/* Password */}
            <div className="">
              <label className="label">Password</label>
              <div className="flex gap-8 items-center ">
                <input
                  name="password"
                  value="************"
                  onChange={handleAccountChange}
                  className="input flex-1"
                  disabled
                />
                <div>
                  <button
                    className="button"
                    type="button"
                    onClick={changePassword}
                  >
                    {" "}
                    Change Password
                  </button>
                </div>
              </div>
              <div className=""></div>
            </div>
            {/* Profile Picture */}

            <div>
              <label className="label">Profile Picture</label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
              <div
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="w-40 h-40 m-4 mt-8 mb-10 border border-black rounded-full overflow-hidden cursor-pointer"
              >
                {accountInformation.pfp ? (
                  <img
                    src={accountInformation.pfp} // Use the preview URL
                    alt="Profile"
                    className="bg-cover aspect-square"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUserCircle size={80} className="w-full h-full" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-green-600">{accountMessage}</p>
            <br/>
            <button type="submit" className="button w-[200px]">
              Confirm Changes
            </button>
          </form>
          <hr />
          {/* Client info Form */}
          <h3 className="text-2xl font-bold text-black mb-4">
            Client Information
          </h3>

          <hr className="border-t border-gray-400 " />
          <form onSubmit={handleSellerSubmit} className="space-y-4">
            <div className="flex  justify-between gap-8 ">
              {/* business name */}
              <div className="flex-1">
                <label className="label">Business name</label>
                <input
                  name="businessName"
                  value={sellerInformation.businessName}
                  onChange={handleSellerChange}
                  className="input"
                />
              </div>
              {/* type */}
              <div className="flex-1 flex flex-col ">
                <label className="label">Seller type</label>
                <select
                  name="sellerType"
                  value={sellerInformation.sellerType}
                  onChange={handleSellerChange}
                  className="w-[30%]   px-3 py-2 border border-gray-300 rounded-md  bg-white text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="individual">individual</option>
                  <option value="company">company</option>
                </select>
              </div>
            </div>
            {/* Phone , email */}
            <div className="flex gap-8">
              <div className="flex-1">
                <label className="label">Business phone number</label>
                <input
                  name="businessPhone"
                  value={sellerInformation.businessPhone}
                  onChange={handleSellerChange}
                  className="input"
                />
              </div>
              <div className="flex-1">
                <label className="label">Business email address</label>
                <input
                  type="text"
                  name="businessEmail"
                  value={sellerInformation.businessEmail}
                  onChange={handleSellerChange}
                  className="input"
                />
              </div>
            </div>
            {/* address, com register*/}

            <div className="flex gap-8">
              <div className="flex-1">
                <label className="label">Business address</label>
                <input
                  name="businessAddress"
                  value={sellerInformation.businessAddress}
                  onChange={handleSellerChange}
                  className="input"
                />
              </div>
              <div className="flex-1">
                <label className="label">Commerce register number</label>
                <input
                  name="commerceRegisterNumber"
                  value={sellerInformation.commerceRegisterNumber}
                  onChange={handleSellerChange}
                  className="input"
                />
              </div>
            </div>


            <div>
  {/* Credit Card */}
  <div className="grid grid-cols-2 gap-8">
    <div>
      <label className="label">Credit Card Number</label>
      <input
        name="creditCardNumber"
        value={sellerInformation.creditCardNumber}
        onChange={handleSellerChange}
        className="input"
      />
    </div>
    <div>
      <label className="label">
        Activated
        <input
          type="checkbox"
          id="creditCardActivity"
          name="creditCardActivity"
          checked={sellerInformation.creditCardActivity}
          onChange={handleSellerChange}
          className="h-11"
        />
      </label>
    </div>
  </div>
</div>

<div>
  {/* Paypal */}
  <div className="grid grid-cols-2 gap-8">
    <div>
      <label className="label">Paypal Account Number</label>
      <input
        name="paypalEmail"
        value={sellerInformation.paypalEmail}
        onChange={handleSellerChange}
        className="input"
      />
    </div>
    <div>
      <label className="label">
        Activated
        <input
          type="checkbox"
          id="paypalActivity"
          name="paypalActivity"
          checked={sellerInformation.paypalActivity}
          onChange={handleSellerChange}
          className="h-11"
        />
      </label>
    </div>
  </div>
</div>

<div>
  {/* Edahabia */}
  <div className="grid grid-cols-2 gap-8">
    <div>
      <label className="label">Edahabia Account Number</label>
      <input
        name="edahabiaNumber"
        value={sellerInformation.edahabiaNumber}
        onChange={handleSellerChange}
        className="input"
      />
    </div> 
    <div>
      <label className="label">
        Activated
        <input
          type="checkbox"
          id="edahabiaActivity"
          name="edahabiaActivity"
          checked={sellerInformation.edahabiaActivity}
          onChange={handleSellerChange}
          className="h-11"
        />
      </label>
    </div>
  </div>
</div>
<br/>
<p className="text-green-600">{sellerMessage}</p>
<br/>
<div className="">
              <button type="submit" className="button px-[20px] mt-4 ">
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;



