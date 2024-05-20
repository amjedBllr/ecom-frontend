import React, { useState } from "react";
import ClientInfo from "../../pages/client/ClientInfo";
import ClientProfileModal from "../../pages/admin/ClientProfileModal";
import SellerInfoModal from "../../pages/admin/sellerProfileModel";
const UserCard = ({ userType }) => {
  const handleConfirmPurchase = () => {
    // Confirm purchase logic here
  };

  const handleEditItem = () => {
    // Edit item logic here
  };

  const handleDeleteItem = () => {
    // Delete item logic here
  };

  return (
    <div className="grid grid-cols-10 gap-4 items-center w-[90%]  text-white bg-[#1E1E1E] px-4 py-6  rounded-[5px] overflow-hidden">
      <div className="flex col-span-2 flex-col gap-8 justify-between">
        <p className="quant">Diaarahem@gmail.com</p>
      </div>
      <div className="flex col-span-1 flex-col gap-8 justify-between">
        <p className="color">{userType}</p>{" "}
      </div>
      <div className="flex  flex-col gap-8 col-span-2">
        {/* <p className="text-white font-bold">Registriation Date</p> */}
        <p className="quant"> 14/05/25 11.22AM</p>
      </div>

      <div className="flex col-span-1 flex-col gap-8">
        {/* <p className="text-white font-bold">Status </p> */}
        <p className="color">Pending</p>{" "}
      </div>

      <div className="flex flex-1 flex-col col-span-4">
        {/* <p className="text-white text-nowrap font-bold text-center  ">
          Mangemnt
        </p> */}
        <div className="flex gap-2 text-nowrap  flex-shrink">
          <button
            className=" bg-green-600 py-2 px-4  hover:bg-green-800"
            onClick={handleConfirmPurchase}
          >
            Confirm User
          </button>
          <button
            className="px-2 py-2 text-nowrap bg-red-600 hover:bg-red-800"
            onClick={handleDeleteItem}
          >
            Delete Item
          </button>
          {userType == "client" ? <ClientProfileModal /> : <SellerInfoModal />}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
