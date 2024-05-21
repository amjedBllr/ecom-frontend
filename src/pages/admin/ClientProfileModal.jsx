import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ClientProfileModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    email,username
  } = props.user

  const {
    userId,fullname,gender,phoneNumber,
    birthday ,shippingAddress,
    secondaryShippingAddress,creditCardNumber,
    paypalEmail,edahabiaNumber,loyaltyPoints
  }= props.client

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Show Client Profile
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            <button
              className="absolute top-4 right-16 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-30"
              onClick={handleCloseModal}
            >
              X
            </button>
            <div className="container mx-auto ">
              <div className="px-12 py-8 gap-4 max-h-screen overflow-y-auto">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Account Information
                </h3>
                <div className="space-y-4 mb-4">
                  {/* Email */}
                  <div className="flex justify-between space-x-4">
                    <div className="flex-1">
                      <label className="label">Email</label>
                      <input
                        name="email"
                        value={email}
                        readOnly
                        className="input"
                      />
                    </div>
                    {/* UserName */}
                    <div className="flex-1">
                      <label className="label">Username</label>
                      <input
                        name="username"
                        value={username}
                        readOnly
                        className="input"
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="label">Password</label>
                    <input
                      name="password"
                      value="**********"
                      readOnly
                      className="input"
                    />
                  </div>
                </div>

                {/* Client info Form */}
                <h3 className="text-2xl font-bold text-black mb-4">
                  Client Information
                </h3>
                <hr className="border-t border-gray-400" />
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between gap-8">
                    {/* fullname */}
                    <div className="flex-1">
                      <label className="block text-black">Full Name</label>
                      <input
                        name="fullName"
                        value={fullname}
                        readOnly
                        className="input"
                      />
                    </div>
                    {/* Gender */}
                    <div className="flex-1 flex flex-col text-black">
                      <label className="label">Gender</label>
                      <select
                        name="gender"
                        value={gender}
                        readOnly
                        disabled
                        className="w-[30%] px-3 py-2 border border-gray-300 rounded-md bg-white text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  {/* Phone number, Birthday */}
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <label className="label">Phone Number</label>
                      <input
                        name="phoneNumber"
                        value={phoneNumber}
                        readOnly
                        className="input"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="label">Birthday</label>
                      <input
                        type="date"
                        name="birthday"
                        value={birthday}
                        readOnly
                        className="input"
                      />
                    </div>
                  </div>
                  {/* Shipping Address 1, Shipping Address 2 */}
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <label className="label">Shipping Address 1</label>
                      <input
                        name="shippingAddress1"
                        value={shippingAddress}
                        readOnly
                        className="input"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="label">Shipping Address 2</label>
                      <input
                        name="shippingAddress2"
                        value={secondaryShippingAddress}
                        readOnly
                        className="input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Credit Card Number</label>
                    <input
                      name="creditCardNumber"
                      value={creditCardNumber}
                      readOnly
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Edahabia Account Number</label>
                    <input
                      name="paypalAccountNumber"
                      value={edahabiaNumber}
                      readOnly
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Paypal Account Number</label>
                    <input
                      name="paypalAccountNumber"
                      value={paypalEmail}
                      readOnly
                      className="input"
                    />
                  </div>
                </div>

                {/* Previous Orders */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientProfileModal;
