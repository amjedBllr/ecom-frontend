import { useState } from "react";
const ProductManagementCard = () => {
  const handleConfirmPurchase = () => {
    // Confirm purchase logic here
  };

  const handleDeleteItem = () => {
    // Delete item logic here
  };

  return (
    <div className="grid grid-cols-10 gap-4 items-center w-[90%]  text-white bg-[#1E1E1E] px-4 py-6  rounded-[5px] overflow-hidden">
      <div className="flex col-span-4 flex-col gap-8 justify-between">
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
        </div>{" "}
      </div>
      <div className="flex  justify-center ">
        <p className="color">Diaa</p>{" "}
      </div>

      <div className="flex col-span-5 justify-center items-center">
        <div className="flex gap-2 text-nowrap justify-center  ">
          <button
            className=" bg-blue-600 py-2 px-4  hover:bg-blue-800"
            onClick={handleConfirmPurchase}
          >
            Show Informations
          </button>
          <button
            className="px-2 py-2 text-nowrap bg-red-600 hover:bg-red-800"
            onClick={handleDeleteItem}
          >
            Delete Item
          </button>
          <ProductModal />
        </div>
      </div>
    </div>
  );
};

export default ProductManagementCard;

import { useEffect } from "react";

const ProductModal = () => {
  const productDetails = {
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sellerName: "nike",
    description:
      "A B&W limited edition of Nike shoes A B&W limited edition of Nike shoes A B&W limited edition of Nike shoes",
    productName: "Air Force 1",
    price: "455$",
    stock: 50,
    brand: "nike",
    category: "clothes",
    miniCategory: "shoes",
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Product Details
      </button>

      {isOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center "
          onClick={closeModal}
        >
          <div
            className=" rounded-lg shadow-lg max-w-4xl my-32 overflow-y-auto bg-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6  py-12 ">
              <div className="flex justify-between items-center mb-6 ">
                <h2 className="text-3xl font-bold text-gray-800">
                  {productDetails.productName}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-lg font-medium text-gray-800">
                    Seller:{" "}
                    <span className="text-gray-600">
                      {productDetails.sellerName}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Brand:{" "}
                    <span className="text-gray-600">
                      {productDetails.brand}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Price:{" "}
                    <span className="text-gray-600">
                      {productDetails.price}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Stock:{" "}
                    <span className="text-gray-600">
                      {productDetails.stock}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Category:{" "}
                    <span className="text-gray-600">
                      {productDetails.category}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Mini Category:{" "}
                    <span className="text-gray-600">
                      {productDetails.miniCategory}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Description:
                  </p>
                  <p className="text-gray-600 text-wrap">
                    {productDetails.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {productDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
