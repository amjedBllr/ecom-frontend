import { useState } from "react";
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../../App.jsx'
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon

const AdminProfile = () => {


  const {userinfo , serverUrl} = useContext(App.context)
  let {_id,email,username,pfp} = userinfo.user_info
  const [accountMessage , setAccountMessage] = useState("")
  const [accountInformation, setAccountInformation] = useState(
    {
      _id:_id,
      email:email,
      username:username,
      pfp:pfp
    }
  );

  const [image , setImage] = useState(pfp)

  // handle the changes of the first form Acoonut
  const handleAccountChange = (e) => {
    setAccountInformation({
      ...accountInformation,
      [e.target.name]: e.target.value,
    });
  };
  //handle the Changes of the second Form

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
  
  }}
 
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
                  disabled
                  value={accountInformation.email}
                  onChange={handleAccountChange}
                  className="input"
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
                  value="**********"
                  disabled
                  onChange={handleAccountChange}
                  className="input flex-1"
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
          <p className="text-xl font-bold  my-20 mb-4 text-red-500">
            Don’t change any information before confirming from the higher posts
            ... Even the developer won’t be able to rescue due to the security
            policy !!
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
