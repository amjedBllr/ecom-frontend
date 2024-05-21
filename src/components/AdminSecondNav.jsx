import React from 'react';
import { Link , useLocation} from 'react-router-dom';

const AdminSecondNav = () => {

  const location = useLocation();

  let selected = {
    backgroundColor: '#E9E9E9'
  };


  return (
    <>
      <nav id='sellerSecondNav'>
        <li style={location.pathname==='/admin/home/users' ? selected : {}}>
          <Link to='/admin/home/users' className='link'><button>Manage users</button></Link>
        </li>
        <li style={location.pathname ==='/admin/home/products' ? selected : {}}>
          <Link to='/admin/home/products' className='link'><button>Manage Products</button></Link>
        </li>
        <li style={location.pathname ==='/admin/home/reports' ? selected : {}}>
          <Link to='/admin/home/reports' className='link'><button>Treat Reports</button></Link>
        </li>
        <li style={location.pathname ==='/admin/home/questions' ? selected : {}}>
          <Link to='/admin/home/questions' className='link'><button>Q&A</button></Link>
        </li>
      </nav>
    </>
  );
};

export default AdminSecondNav;
