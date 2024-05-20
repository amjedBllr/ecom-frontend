import React, { useState } from "react";

const NotificationsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "You have received a new order for Smartphone X.",
      timestamp: "2023-05-19T10:30:00Z",
    },
    {
      id: 2,
      title: "Product Review",
      message: "A customer left a 5-star review for Dress Y.",
      timestamp: "2023-05-18T14:45:00Z",
    },
    {
      id: 3,
      title: "Delivery Update",
      message: "Your order for Smartwatch Z has been shipped.",
      timestamp: "2023-05-17T09:15:00Z",
    },
    // Add more notifications as needed
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative">
      <button
        className="text-white px-4 py-2 rounded-md hover:bg-gray-200"
        onClick={toggleModal}
      >
        <img src="../../public/icons/notification.png" alt="Notifications" />
      </button>
      {showModal && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
          <div className="max-h-80 w-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-green-500">
                  {notification.title}
                </h3>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsModal;
