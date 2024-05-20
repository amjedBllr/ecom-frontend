import { useState } from "react";

import { FaUserCircle } from "react-icons/fa"; // Import the profile icon

const AdminProfile = () => {
  const [accountInformation, setAccountInformation] = useState({
    email: "example@example.com",
    username: "exampleUser",
    password: "examplePassword",
    profilePic: "",
  });

  const [clientInformation, setClientInformation] = useState({
    fullName: "John Doe",
    gender: "Male",
    phoneNumber: "123-456-7890",
    birthday: "1990-01-01",
    shippingAddress1: "123 Example St",
    shippingAddress2: "Apt 4B",
    creditCardNumber: "1234-5678-9012-3456",
    paypalAccountNumber: "example@paypal.com",
  });
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

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    // Handle account information submit
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    // Handle client information submit
  };
  // to change the picture of the profile
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccountInformation({
          ...accountInformation,
          profilePic: reader.result,
        });
      };
      reader.readAsDataURL(file);
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
                  value={accountInformation.password}
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
              <div
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="w-40 h-40 border border-black rounded-full overflow-hidden cursor-pointer"
              >
                {accountInformation.profilePic ? (
                  <img
                    src={accountInformation.profilePic}
                    alt="Profile"
                    className=" bg-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUserCircle size={80} className="w-full h-full" />
                  </div>
                )}
              </div>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
            </div>
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
