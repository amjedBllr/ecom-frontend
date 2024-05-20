
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import CategoryList from "../../components/Header/HeaderLinks";
import React from "react";
import optionIcon from "../../../public/icons/options.png";
import axios from 'axios';
import { useEffect , useContext , useState , useRef} from 'react';
import App from "../../App";

const categories = [
  {
    name: "Electronics",
    miniCategories: [
      { link: "#", label: "Computers & Tablets" },
      { link: "#", label: "Cell Phones" },
      { link: "#", label: "TV & Home Theater" },
      { link: "#", label: "Video Games & Consoles" },
    ],
  },
  {
    name: "Accessories",
    miniCategories: [
      { link: "#", label: "Watches" },
      { link: "#", label: "Jewelry" },
      { link: "#", label: "Handbags & Wallets" },
      { link: "#", label: "Sunglasses" },
    ],
  },
  {
    name: "Clothes",
    miniCategories: [
      { link: "#", label: "Men's Clothing" },
      { link: "#", label: "Women's Clothing" },
      { link: "#", label: "Kid's Clothing" },
      { link: "#", label: "Shoes" },
    ],
  },
  {
    name: "Kitchen",
    miniCategories: [
      { link: "#", label: "Cookware" },
      { link: "#", label: "Small Appliances" },
      { link: "#", label: "Kitchen Utensils & Gadgets" },
      { link: "#", label: "Dinnerware" },
    ],
  },
  {
    name: "Gaming",
    miniCategories: [
      { link: "#", label: "Video Games" },
      { link: "#", label: "Gaming Consoles" },
      { link: "#", label: "Gaming Accessories" },
      { link: "#", label: "PC Gaming" },
    ],
  },
  {
    name: "Home Garden",
    miniCategories: [
      { link: "#", label: "Furniture" },
      { link: "#", label: "Decor" },
      { link: "#", label: "Gardening Supplies" },
      { link: "#", label: "Outdoor Living" },
    ],
  },
  {
    name: "Books",
    miniCategories: [
      { link: "#", label: "Fiction" },
      { link: "#", label: "Non-fiction" },
      { link: "#", label: "Children's Books" },
      { link: "#", label: "Textbooks" },
    ],
  },
  {
    name: "Sports",
    miniCategories: [
      { link: "#", label: "Exercise & Fitness" },
      { link: "#", label: "Outdoor Recreation" },
      { link: "#", label: "Sports Gear" },
      { link: "#", label: "Fan Shop" },
    ],
  },
  {
    name: "Automotive",
    miniCategories: [
      { link: "#", label: "Car Parts" },
      { link: "#", label: "Car Accessories" },
      { link: "#", label: "Motorcycles & ATVs" },
      { link: "#", label: "Tires & Wheels" },
    ],
  },
  {
    name: "Health",
    miniCategories: [
      { link: "#", label: "Makeup" },
      { link: "#", label: "Skin Care" },
      { link: "#", label: "Hair Care" },
      { link: "#", label: "Personal Care" },
    ],
  },
  {
    name: "Toys & Games",
    miniCategories: [
      { link: "#", label: "Action Figures" },
      { link: "#", label: "Board Games" },
      { link: "#", label: "Dolls & Plush" },
      { link: "#", label: "Educational Toys" },
    ],
  },
];

const SearchPage = () => {

  const [showOptions, setShowOptions] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMiniCategory, setSelectedMiniCategory] = useState("");
  //?with discount or without
  const [selectedType, setSelectedType] = useState("false");
  const [page,setPage] = useState(1)
  const [products,setProducts] = useState([])
  const [message , setMessage] = useState("")
  const handleOptionClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedMiniCategory(""); // Reset mini category when category changes
  };

  const handleMiniCategoryChange = (event) => {
    setSelectedMiniCategory(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const currentMiniCategories =
    categories.find((category) => category.name === selectedCategory)
      ?.miniCategories || [];

  const {serverUrl} = useContext(App.context)
  const resultsRef = useRef(null);

  const handleSearch = async () => {
    let query = `?name=${selectedName}`;
  
    if (selectedType === "true") {
      query += `&discount=true`;
    }
  
    query += `&category=${selectedCategory}`;
    query += `&type=${selectedMiniCategory}`;
    query += `&page=${page}`;
  
    try {
      const prods = await axios.get(`${serverUrl}/api/v1/products${query}`);
      setProducts(prods.data.data);
      setMessage("")
    } catch (error) {
      console.error(error);
      setProducts([])
      setMessage(error.response.data.message)
    }
  };
  
  useEffect(()=>{
    handleSearch()
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[page])
    

  return (
    <div className="overflow-x-auto">
      <header className="bg-fixed z-10 mb-12">
      <nav className="flex  w-full bg-white padding-x  justify-around py-6 px-10 items-center ">
        <Link to="/client/home">
          <h1 className="text-4xl font-bold font-Palanquin md:text-2xl ">
            SouqKantra
          </h1>
        </Link>
        <div className="relative pl-4 h-12 flex items-center justify-between bg-white rounded-lg shadow-md w-[40%] z-20">
      <input
        type="text"
        name="text"
        id="input"
        placeholder="Search"
        value={selectedName}
        onChange={handleNameChange}
        className="w-40 h-full border-none text-xl outline-none font-medium text-gray-700"
        aria-label="Search input"
      />
      <div className="flex items-center relative">
        <div className="px-3 border-r border-gray-300">
        <button 
  onClick={_ => {
    setPage(1);
    handleSearch();
  }}
  className="px-4 py-2 bg-blue-500 text-white rounded"
>
  <svg
    viewBox="0 0 512 512"
    className="w-3 h-3 text-gray-700"
    aria-hidden="true"
  >
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
  </svg>
</button>
          
        </div>
        <button
          onClick={handleOptionClick}
          className="p-3 h-full border-none bg-transparent cursor-pointer transition-colors duration-300 hover:bg-red-300"
          aria-label="Options"
        >
          <img src={optionIcon} alt="Options" className="h-4 w-4" />
        </button>
        {showOptions && (
          <div className="absolute top-full left-0 mt-1 w-64 p-4 bg-gray-100 rounded shadow-lg z-50">
            <select
              className="w-full mb-2 p-2 border rounded "
              aria-label="Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              className="w-full mb-2 p-2 border rounded"
              aria-label="MiniCategory"
              value={selectedMiniCategory}
              onChange={handleMiniCategoryChange}
              disabled={!selectedCategory}
            >
              <option value="" disabled>
                Select MiniCategory
              </option>
              {currentMiniCategories.map((miniCategory, index) => (
                <option key={index} value={miniCategory.label}>
                  {miniCategory.label}
                </option>
              ))}
            </select>
            <select
              className="w-full mb-2 p-2 border rounded"
              aria-label="on discount"
              onChange={handleSelectChange}
              value={selectedType}
            >
              <option value="true">
                On Discount
              </option>
              <option value="false">
                Without Discount
              </option>
              {/* Add your discounts here */}
            </select>
            <button onClick={handleOptionClick}
              className="w-full p-2 bg-blue-500 text-white rounded"
              aria-label="Confirm"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
        <div className="flex gap-4 ">
          <Link to="/client/search">
            <img src="../../public/icons/img_rewind.svg" />{" "}
          </Link>

          <Link className="inline-block text-sm" to="/client/cart">
            <img src="../../public/icons/bag.svg" />
            <span>(0)</span>{" "}
          </Link>
          <Link to="/client/profile">
            <img src="../../public/icons/img_lock.svg" />
          </Link>
        </div>
      </nav>
      <CategoryList className="" />
      <div className="w-full h-8 text-xs sm:text-sm md:text-base font-bold bg-secondary  flex justify-center items-center leading-tight">
        <p>free shipping on all orders over 10000DA</p>
      </div>
    </header>
      <h1 ref={resultsRef} className="text-3xl font-bold padding-x my-8">Search Results</h1>
      <div className="grid grid-cols-5  gap-x-8 gap-y-8 padding-x sm:flex sm:flex-col my-12">
      {products.map((product, index) => (
          <ProductCard
            key={index}
            product = {product}
            className="bg-white text-text"
          />
        ))}
      </div>
      <div className="h-full flex justify-center">
        <p className="text-red-500">{message}</p>
        
      </div>
      <br/> 
      <br/> 
      <div className="h-full flex justify-center items-center gap-10">
      <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1))
            
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >prev page</button>
        <p className="font-semibold">{page}</p>
      <button
          onClick={() => {
            setPage((prev) => prev + 1)
            
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >next page</button>
        
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
