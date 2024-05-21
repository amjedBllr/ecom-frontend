import { useState } from "react";
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../../App.jsx'
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon

const ClientProfile = () => {

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
  const [clientMessage , setClientMessage] = useState("")
  const [clientInformation, setClientInformation] = useState(userinfo.client_info);
  // handle the changes of the first form Acoonut
  const handleAccountChange = (e) => {
    setAccountInformation({
      ...accountInformation,
      [e.target.name]: e.target.value,
    });
  };
  //handle the Changes of the second Form
  const handleClientChange = (e) => {
    setClientInformation({
      ...clientInformation,
      [e.target.name]: e.target.value,
    });
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

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      setClientMessage("proccessing ...")

      const client = await axios.patch(`${serverUrl}/api/v1/clients/${clientInformation._id}`, clientInformation, {
        withCredentials: true,
      });
      console.log(client);
      setClientMessage("Client information was patched successfully !!")
    } catch (error) {
      console.log(error);
      setClientMessage("Failed to patch client information !!")
    }
  };

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
          <h3 className="mt-10 text-2xl font-bold text-black mb-4">
            Client Information
          </h3>

          <hr className="border-t border-gray-400 " />
          <form onSubmit={handleClientSubmit} className="space-y-4">
            <div className="flex  justify-between gap-8 ">
              {/* username */}
              <div className="flex-1">
                <label className="block text-black">Full Name</label>
                <input
                  name="fullname"
                  value={clientInformation.fullname}
                  onChange={handleClientChange}
                  className="input"
                />
              </div>
              {/* Gender */}
              <div className="flex-1 flex flex-col ">
                <label className="label">Gender</label>
                <select
                  name="gender"
                  value={clientInformation.gender}
                  onChange={handleClientChange}
                  className="w-[30%]   px-3 py-2 border border-gray-300 rounded-md  bg-white text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            {/* Phone number , Birthday  */}
            <div className="flex gap-8">
              <div className="flex-1">
                <label className="label">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={clientInformation.phoneNumber}
                  onChange={handleClientChange}
                  className="input"
                />
              </div>
              <div className="flex-1">
                <label className="label">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={clientInformation.birthday}
                  onChange={handleClientChange}
                  className="input"
                />
              </div>
            </div>
            {/* Shipping Address 1 , Shipping Address 2 */}

            <div className="flex gap-8">
              <div className="flex-1">
                <label className="label">Shipping Address 1</label>
                <input
                  name="shippingAddress"
                  value={clientInformation.shippingAddress}
                  onChange={handleClientChange}
                  className="input"
                />
              </div>
              <div className="flex-1">
                <label className="label">Shipping Address 2</label>
                <input
                  name="secondaryShippingAddress"
                  value={clientInformation.secondaryShippingAddress}
                  onChange={handleClientChange}
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="label">Credit Card Number</label>
              <input
                name="creditCardNumber"
                value={clientInformation.creditCardNumber}
                onChange={handleClientChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">Edahabia Card Number</label>
              <input
                name="edahabiaNumber"
                value={clientInformation.edahabiaNumber}
                onChange={handleClientChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">Paypal Email</label>
              <input
                name="paypalEmail"
                value={clientInformation.paypalEmail}
                onChange={handleClientChange}
                className="input"
              />
            </div>
            <br/>
              <p className="text-green-600">{clientMessage}</p>
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

export default ClientProfile;
