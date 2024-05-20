import React, { useState } from "react";

const ReportTreatment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      reporter: "John Doe",
      product: "Smartphone X",
      seller: "TechStore",
      type: "Scam",
      productImage:
        "https://m.media-amazon.com/images/I/71UmvqTuSbL._AC_SL1500_.jpg",
      productLink: "https://example.com/product/smartphone-x",
    },
    {
      id: 2,
      reporter: "Jane Smith",
      product: "Dress Y",
      seller: "FashionHouse",
      type: "Sexual Content",
      productImage:
        "https://m.media-amazon.com/images/I/71UmvqTuSbL._AC_SL1500_.jpg",
      productLink: "https://example.com/product/dress-y",
    },
    // Add more reports as needed
  ];

  const handleShowModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleDeleteReport = (reportId) => {
    // Implement report deletion logic here
    console.log(`Deleting report with ID ${reportId}`);
  };

  const handleDeleteProduct = () => {
    // Implement product deletion logic here
    console.log("Deleting product");
  };

  const handleBanSeller = () => {
    // Implement seller banning logic here
    console.log("Banning seller");
  };

  return (
    <div className="container mx-auto py-8 padding-x">
      <h1 className="text-3xl font-bold mb-4">Report Treatment</h1>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Reporter Name</th>
              <th className="px-4 py-2">Type of Report</th>
              <th className="px-4 py-2">Seller Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{report.reporter}</td>
                <td className="px-4 py-2">{report.type}</td>
                <td className="px-4 py-2">{report.seller}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                    onClick={() => handleShowModal(report)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-50 overflow-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Report Details</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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
                <div className="mb-4">
                  <img
                    src={selectedReport.productImage}
                    alt={selectedReport.product}
                    className="w-full h-auto max-h-60 object-contain"
                  />
                </div>
                <p className="mb-2">
                  <span className="font-bold">Reporter:</span>{" "}
                  {selectedReport.reporter}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Reported Product:</span>{" "}
                  {selectedReport.product}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Seller:</span>{" "}
                  {selectedReport.seller}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Report Type:</span>{" "}
                  {selectedReport.type}
                </p>
                <div className="flex justify-end">
                  <a
                    href={selectedReport.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    See Product
                  </a>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={handleBanSeller}
                  >
                    Ban Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </>
      )}
    </div>
  );
};

export default ReportTreatment;
