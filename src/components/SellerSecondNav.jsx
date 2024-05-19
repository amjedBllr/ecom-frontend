import React from 'react';
import { Link , useLocation} from 'react-router-dom';

const SellerSecondNav = () => {

  const location = useLocation();

  let selected = {
    backgroundColor: '#E9E9E9'
  };


  return (
    <>
      <nav id='sellerSecondNav'>
        <li style={location.pathname==='/seller/home/store' ? selected : {}}>
          <Link to='store' className='link'><button>Store page</button></Link>
        </li>
        <li style={location.pathname ==='/seller/home/orders' ? selected : {}}>
          <Link to='orders' className='link'><button>Purchase orders</button></Link>
        </li>
      </nav>
    </>
  );
};

export default SellerSecondNav;
