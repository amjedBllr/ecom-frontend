import ClientProfileModal from "../../pages/admin/ClientProfileModal";
import SellerInfoModal from "../../pages/admin/sellerProfileModel";
import React, { useState, useEffect, useContext } from 'react';
import App from '../../App';
import axios from 'axios';

const UserCard = (props) => {
  

  const {
    email,registrationDate,role,accountStatus,pfp,username,_id
  } = props.user

  const { serverUrl } = useContext(App.context);

  const [seller , setSeller] = useState({})
  const [client , setClient] = useState({})
  
  const handleConfirmUser = async () => {
    try {
      console.log(_id)
      const user = await axios.patch(`${serverUrl}/api/v1/sellers/${seller._id}`,{sellerStatus:"verified"}, { withCredentials: true })
      setSeller((prev)=>{
        return({...prev})
      })
      alert('Seller confirmed successfully !!')

    } catch (error) {
      console.log(error)
      alert('Failed to confirm seller !!')
    }
  };

  const handleDeleteUser = async () => {
    try {
      const user = await axios.delete(`${serverUrl}/api/v1/users/${_id}`, { withCredentials: true })
      alert('User deleted successfully !!')
    } catch (error) {
      console.log(error)
      alert('Failed to delete user !!')
    }
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const user = await axios.get(`${serverUrl}/api/v1/users/${_id}`, { withCredentials: true });
        
        if(role==="seller"){
          const seller = await axios.get(`${serverUrl}/api/v1/sellers/${user.data.data.seller_id}`, { withCredentials: true });
          setSeller(seller.data.data);
        }

        else if(role==="client"){
          const client = await axios.get(`${serverUrl}/api/v1/clients/${user.data.data.client_id}`, { withCredentials: true });
          setClient(client.data.data);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serverUrl]);

  if (role === "admin") {
    return null; // Don't render anything if the user is an admin
  }

  return (
    <div className="grid grid-cols-10 gap-4 items-center w-[90%]  text-white bg-[#1E1E1E] px-4 py-6  rounded-[5px] overflow-hidden">
      <div className="flex col-span-2 flex-col gap-8 justify-between overflow-hidden">
        <p className="quant">{email}</p>
      </div>
      <div className="flex col-span-1 flex-col gap-8 justify-between">
        <p className="color">{role}</p>{" "}
      </div>
      <div className="flex  flex-col gap-8 col-span-2">
        {/* <p className="text-white font-bold">Registriation Date</p> */}
        <p className="quant">{registrationDate.split('T')[0]}<br />{new Date(registrationDate).toLocaleTimeString()}</p>
      </div>

      <div className="flex col-span-1 flex-col gap-8">
      <p className={`text-center ${role === "client" ? (accountStatus === 'verified' ? 'text-green-500' : 'text-red-500') : (seller.sellerStatus === 'verified' ? 'text-green-500' : 'text-red-500')}`}>
    {role === "client" ? `email\n${accountStatus}` : `information\n${seller.sellerStatus}`}
      </p>
    </div>


      <div className="flex flex-1 flex-col col-span-4">
        {/* <p className="text-white text-nowrap font-bold text-center  ">
          Mangemnt
        </p> */}
        <div className="flex gap-2 justify-end text-nowrap  flex-shrink">
          {role==="seller" &&
          <button
            className=" bg-green-600 py-2 px-4  hover:bg-green-800"
            onClick={handleConfirmUser}
          >
            Confirm User
          </button>}

          <button
            className="px-2 py-2 text-nowrap bg-red-600 hover:bg-red-800"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
          {role == "client" ? <ClientProfileModal user={props.user} client={client} /> : <SellerInfoModal user={props.user} seller={seller} />}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
