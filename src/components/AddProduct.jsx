
import React, { useState, useMemo, useContext } from 'react';
import App from '../App';
import axios from 'axios';

function AddProduct(props) {
  const categories = useMemo(() => [
    {
      name: "Electronics",
      miniCategories: [
        { link: "#", label: "Computers&Tablets" },
        { link: "#", label: "CellPhones" },
        { link: "#", label: "TV&Home Theater" },
        { link: "#", label: "VideoGames&Consoles" },
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
  ], []);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedCategoryType, setSelectedCategoryType] = useState(categories[0].miniCategories[0]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    price: "",
    colors: "",
    sizes: "",
    dimensions: "",
    quantityAvailable: "",
    photos: null,
    category: categories[0].name,
    categoryType: categories[0].miniCategories[0].label,
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const category = categories.find(category => category.name === e.target.value);
    setSelectedCategory(category);
    setSelectedCategoryType(category.miniCategories[0]);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: category.name,
      categoryType: category.miniCategories[0].label,
    }));
  };

  const handleCategoryTypeChange = (e) => {
    const categoryType = selectedCategory.miniCategories.find(categoryType => categoryType.label === e.target.value);
    setSelectedCategoryType(categoryType);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      categoryType: categoryType.label,
    }));
  };

  const handleFileChange = (e) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      photos: e.target.files[0],
    }));
  };

  const { serverUrl } = useContext(App.context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.post(`${serverUrl}/api/v1/products`, formData, { withCredentials: true });
      console.log('Product added!');
      window.alert("Product added successfully!!");
      props.closeModal();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add product!!");
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-dark flex items-center justify-center bg-slate-600 bg-opacity-20 py-4">
      <div className="relative p-6 bg-white w-full max-w-md m-auto flex-col flex">
        <span
          className="absolute top-0 right-0 cursor-pointer p-4 hover:bg-red-500 hover:text-white inline-block rounded"
          onClick={props.closeModal}
        >
          X
        </span>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full py-4">
            <label className="block mb-4">
              <span className="text-gray-700">Product Name:</span>
              <input
                type="text"
                required
                name="productName"
                value={newProduct.productName}
                onChange={handleInputChange}
                className="mt-3 block w-full rounded-md border-gray-300 border-[0.2px] p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Description:</span>
              <textarea
                name="description"
                required
                value={newProduct.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md outline-none border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                required
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <br />
            <p className='text-blue-500'>Separate multiple values with ; symbol<br />ex: 'Black ; Red ; White'</p>
            <br />
            <label className="block mb-4">
              <span className="text-gray-700">Colors:</span>
              <input
                type="text"
                name="colors"
                value={newProduct.colors}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Sizes:</span>
              <input
                type="text"
                name="sizes"
                value={newProduct.sizes}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Dimensions:</span>
              <input
                type="text"
                name="dimensions"
                value={newProduct.dimensions}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Quantity Available:</span>
              <input
                type="number"
                name="quantityAvailable"
                value={newProduct.quantityAvailable}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Photos:</span>
              <input
                type="file"
                name="photos"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Category:</span>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Mini Category:</span>
              <select
                name="categoryType"
                value={newProduct.categoryType}
                onChange={handleCategoryTypeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {selectedCategory.miniCategories.map((categoryType) => (
                  <option key={categoryType.label} value={categoryType.label}>
                    {categoryType.label}
                  </option>
                ))}
              </select>
            </label>
            <input
              type="submit"
              value="Add Product"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
