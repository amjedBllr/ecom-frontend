import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SellerInfoModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sellerInformation = {
    sellerType: "individual",
    businessName: "daWhiteGuy",
    businessAddress: "lhouma lfoulania fi alitigah al foulani",
    businessEmail: "business@business.dz",
    businessPhone: "+3218123498",
    creditCardActivity: false,
    paypalActivity: false,
    edahabiaActivity: false,
    commerceRegisterNumber: "283945987345",
    creditCardNumber: "32405982340958",
    paypalNumber: "9q8498572345",
    edahabiaNumber: "9897359873245",
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Show Seller Profile
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            <button
              className="absolute top-12 right-16 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>
            <div className="container mx-auto">
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
                        value="example@example.com"
                        readOnly
                        className="input"
                      />
                    </div>
                    {/* UserName */}
                    <div className="flex-1">
                      <label className="label">Username</label>
                      <input
                        name="username"
                        value="exampleUser"
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
                      value="examplePassword"
                      readOnly
                      className="input"
                    />
                  </div>
                </div>
                {/* Seller info Form */}
                <h3 className="text-2xl font-bold text-black mb-4">
                  Seller Information
                </h3>
                <hr className="border-t border-gray-400" />
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between gap-8">
                    {/* business name */}
                    <div className="flex-1">
                      <label className="label">Business name</label>
                      <input
                        name="businessName"
                        value={sellerInformation.businessName}
                        readOnly
                        className="input"
                      />
                    </div>
                    {/* type */}
                    <div className="flex-1 flex flex-col">
                      <label className="label">Seller type</label>
                      <select
                        name="sellerType"
                        value={sellerInformation.sellerType}
                        readOnly
                        className="w-[80%] px-3 py-2 text-black border border-gray-300 rounded-md bg-white text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="individual">individual</option>
                        <option value="company">company</option>
                      </select>
                    </div>
                  </div>
                  {/* Phone, email */}
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <label className="label">Business phone number</label>
                      <input
                        name="businessPhone"
                        value={sellerInformation.businessPhone}
                        readOnly
                        className="input"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="label">Business email address</label>
                      <input
                        type="text"
                        name="businessEmail"
                        value={sellerInformation.businessEmail}
                        readOnly
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
                        readOnly
                        className="input"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="label">Commerce register number</label>
                      <input
                        name="commerceRegisterNumber"
                        value={sellerInformation.commerceRegisterNumber}
                        readOnly
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
                          readOnly
                          className="input"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="label ">Activated</label>
                        <input
                          type="checkbox"
                          id="creditCardActivity"
                          name="creditCardActivity"
                          checked={sellerInformation.creditCardActivity}
                          readOnly
                          className="h-8 "
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* Paypal */}
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="label">Paypal Account Number</label>
                        <input
                          name="paypalNumber"
                          value={sellerInformation.paypalNumber}
                          readOnly
                          className="input"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="label">Activated</label>
                        <input
                          type="checkbox"
                          id="paypalActivity"
                          name="paypalActivity"
                          checked={sellerInformation.paypalActivity}
                          readOnly
                          className="h-8"
                        />
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
                          readOnly
                          className="input"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="label">Activated</label>{" "}
                        <input
                          type="checkbox"
                          id="edahabiaActivity"
                          name="edahabiaActivity"
                          checked={sellerInformation.edahabiaActivity}
                          readOnly
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerInfoModal;
