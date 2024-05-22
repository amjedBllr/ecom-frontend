import React, { useState } from "react";
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../App.jsx'

const Help = () => {
  const [reportType, setreportType] = useState("");
  const [reportIssue, setreportIssue] = useState("");
  const [reportDescription, setreportDescription] = useState("");
  const [reportedEntity, setreportedEntity] = useState("");
  const {serverUrl , userinfo} = useContext(App.context)
  const userId = userinfo.user_info._id
  const [message,setMessage]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userId,
      reportType,
      reportIssue,
      reportDescription,
      reportedEntity,
    };
    setMessage("proccessing....")
    try {
      await axios.post(`${serverUrl}/api/v1/reports`,formData,{withCredentials:true});
      setMessage("report was added successfully !!");
    } catch (error) {
        console.log(error);
        setMessage("Could not add report !")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
      <div className="flex items-center mb-8">
        <div className="p-3 bg-blue-500 rounded-full text-white mr-4">
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.794-1.906 3.25-4.25 3.25-1.497 0-2.812-.746-3.543-1.886M6.75 12a.75.75 0 000-1.5m3.75 1.5a.75.75 0 000-1.5m3.75 1.5a.75.75 0 000-1.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Report an Issue</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <div className="mb-4">
          <label
            htmlFor="reportType"
            className="block text-gray-700 font-bold mb-2"
          >
            Issue Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setreportType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an issue type</option>
            <option value="productReport">Product Report</option>
            <option value="technicalIssue">Technical Issue</option>
            <option value="refundProblem">Refund Problem</option>
          </select>
        </div>
        {reportType === "productReport" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="reportedEntity"
                className="block text-gray-700 font-bold mb-2"
              >
                Product URL
              </label>
              <input
                type="text"
                id="reportedEntity"
                value={reportedEntity}
                onChange={(e) => setreportedEntity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="reportIssue"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Issue
              </label>
              <select
                id="reportIssue"
                value={reportIssue}
                onChange={(e) => setreportIssue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a product issue</option>
                <option value="scam">Scam</option>
                <option value="fraud">Fraud</option>
                <option value="didntDeliver">Didn't Deliver</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="reportDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="reportDescription"
            value={reportDescription}
            onChange={(e) => setreportDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <br/>
        <p className="text-green-500">{message}</p>
        <br/>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Help;
