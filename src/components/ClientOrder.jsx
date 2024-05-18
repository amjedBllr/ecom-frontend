import { useState } from "react";
import { LiaEthereum } from "react-icons/lia";
const ClientOrder = (props) => {
  let [confirmed, setConfirmed] = useState(props.confirmed);
  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    if (!confirmed) {
      setShowButtons(!showButtons);
    }
  };
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
            src="../../public/images/img_games.png"
          />
          <div className="flex  flex-col text-white gap-2 pb-2">
            <h4 className="text-[16px] font-[400]">ps5 games</h4>
            <p className="text-[8px] flex-1">
              some of the cool games that i don't
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Size</p>
          <p className="quant">M</p>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Color</p>
          <p className="color">Purple</p>{" "}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-white ">Quantity</p>
          <p className="quant">x2</p>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {props.dimens > 0 && (
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-white ">Dimens</p>
              <p className="quant">{props.dimens}</p>
            </div>
          )}
        </div>

        <div className="flex  flex-1 flex-col gap-2">
          <p className="text-white ">Price</p>
          <p className="color">28$</p>{" "}
        </div>

        <div className="flex  flex-1 flex-col gap-2">
          <p className="text-white ">Total Price</p>
          <p className="color">56$</p>{" "}
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
