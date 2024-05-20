import { useState } from "react";
import { useNavigate } from "react-router-dom";

const product = {
  id: "1",
  name: "Product Name",
  colors: ["red", "blue"],
  sizes: ["xl", "2xl"],
  dimensions: ["10x10", "20x20"],
  description: "Product Description",
  price: 100,
  category: "Category",
  brand: "Brand",
  stock: 50,
  images: [
    {
      id: 1,
      url: "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      url: "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      url: "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  onDiscount : false ,
  discountedPrice : null ,
};

const EditableProductDetailsPage = () => {
  const [productData, setProductData] = useState(product);
  const [draggedImage, setDraggedImage] = useState(null);
  const [newImages, setNewImages] = useState([]);

  // start data

  // end data

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // categories
  const categories = [
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
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedMiniCategory, setSelectedMiniCategory] = useState(
    categories[0].miniCategories[0]
  );
  const handleCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.name === e.target.value
    );
    setSelectedCategory(category);
    setSelectedMiniCategory(category.miniCategories[0]);
    setProductData({
      ...productData,
      category: category.name,
      miniCategory: category.miniCategories[0].label,
    });
  };
  const handleMiniCategoryChange = (e) => {
    const miniCategory = selectedCategory.miniCategories.find(
      (miniCategory) => miniCategory.label === e.target.value
    );
    setSelectedMiniCategory(miniCategory);
    setProductData({
      ...productData,
      miniCategory: miniCategory.label,
    });
  };

  //end categories
  // handle size , dimens , color changes
  //   handle delete size
  const handleSizeDelete = (index) => {
    setProductData((prevState) => {
      const sizes = [...prevState.sizes];
      sizes.splice(index, 1);
      return { ...prevState, sizes };
    });
  };
  //   handle delete color
  const handleColorDelete = (index) => {
    setProductData((prevState) => {
      const colors = [...prevState.colors];
      colors.splice(index, 1);
      return { ...prevState, colors };
    });
  };
  // handle delete dimenisinos
  const handleDimensionDelete = (index) => {
    setProductData((prevState) => {
      const dimensions = [...prevState.dimensions];
      dimensions.splice(index, 1);
      return { ...prevState, dimensions };
    });
  };
  const handleSizeChange = (e) => {
    if (e.key === "Enter") {
      const newSize = e.target.value.trim();
      if (newSize && !productData.sizes.includes(newSize)) {
        setProductData({
          ...productData,
          sizes: [...productData.sizes, newSize],
        });
        e.target.value = "";
      }
    }
  };

  const handleDimensionChange = (e) => {
    if (e.key === "Enter") {
      const newDimension = e.target.value.trim();
      if (newDimension && !productData.dimensions.includes(newDimension)) {
        setProductData({
          ...productData,
          dimensions: [...productData.dimensions, newDimension],
        });
        e.target.value = "";
      }
    }
  };

  const handleColorChange = (e) => {
    if (e.key === "Enter") {
      const newColor = e.target.value.trim();
      if (newColor && !productData.colors.includes(newColor)) {
        setProductData({
          ...productData,
          colors: [...productData.colors, newColor],
        });
        e.target.value = "";
      }
    }
  };



  const navigate = useNavigate();
  const handleSaveChanges = () => {
    navigate("/seller/home/store");
    console.log(productData);
  };

  const handleImageDelete = (id) => {
    setProductData({
      ...productData,
      images: productData.images.filter((image) => image.id !== id),
    });
  };

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const newImages = [...productData.images];
    const draggedImageIndex = newImages.findIndex(
      (image) => image === draggedImage
    );
    newImages.splice(draggedImageIndex, 1);
    const dropIndex = e.currentTarget.dataset.index;
    newImages.splice(dropIndex, 0, draggedImage);

    setProductData({
      ...productData,
      images: newImages,
    });
    setDraggedImage(null);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => ({
      id: Date.now(),
      url: URL.createObjectURL(file),
    }));
    setNewImages([...newImages, ...uploadedImages]);
  };

  const handleNewImageDelete = (id) => {
    setNewImages(newImages.filter((image) => image.id !== id));
  };


  const handleDelete = (e)=>{
    e.preventDefault()
    return
  }

  const handleCancel = (e)=>{
    e.preventDefault()
    return
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Edit Product Details
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="product-input"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="product-input w-[100%]"
            />
          </div>
          <div className="my-4">
            <label htmlFor="colors" className="block font-medium text-gray-700">
              Colors
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                id="colors"
                onKeyDown={handleColorChange}
                placeholder="Enter a color and press Enter"
                className="product-input"
              />
              <div className="flex flex-wrap gap-2">
                {productData.colors.map((color, index) => (
                  <span
                    key={index}
                    className="relative inline-flex items-center rounded-xl font-bold  text-[15px] bg-gray-200 text-gray-800 py-3 px-5"
                  >
                    {color}
                    <span
                      onClick={() => handleColorDelete(index)}
                      className="ml-2 cursor-pointer bg-white rounded-full absolute top-0 right-0  py-[1px] px-1 text-red-500 font-bold text-[15px]"
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="my-4">
            <label htmlFor="sizes" className="block font-medium text-gray-700">
              Sizes
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                id="sizes"
                onKeyDown={handleSizeChange}
                placeholder="Enter a size and press Enter"
                className="product-input"
              />
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="relative inline-flex items-center rounded-xl font-bold text-[15px] bg-gray-200 text-gray-800 py-3 px-5"
                  >
                    {size}
                    <span
                      onClick={() => handleSizeDelete(index)}
                      className="ml-2 cursor-pointer rounded-full absolute top-0 right-0 py-[1px] px-1 text-red-500 font-bold text-[15px]"
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="dimensions"
              className="block font-medium text-gray-700"
            >
              Dimensions
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                id="dimensions"
                onKeyDown={handleDimensionChange}
                placeholder="Enter a dimension and press Enter"
                className="product-input"
              />
              <div className="flex flex-wrap gap-2">
                {productData.dimensions.map((dimension, index) => (
                  <span
                    key={index}
                    className="relative inline-flex items-center rounded-xl font-bold text-[15px] bg-gray-200 text-gray-800 py-3 px-5"
                  >
                    {dimension}
                    <span
                      onClick={() => handleDimensionDelete(index)}
                      className="ml-2 cursor-pointer bg-white rounded-full absolute top-0 right-0 py-[1px] px-1 text-red-500 font-bold text-[15px]"
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="product-input"
            />
          </div>
          <div className="my-4">
            <label className="block ">
              <span className="text-gray-700">Category:</span>
              <select
                name="category"
                value={selectedCategory.name}
                onChange={handleCategoryChange}
                className="mt-2 block w-full rounded-md border-gray-300  p-2 product-input"
              >
                {categories.map((category) => (
                  <option
                    key={category.name}
                    value={category.name}
                    className="mt-4"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block ">
              <span className="text-gray-700">Mini Category:</span>
              <select
                name="miniCategory"
                value={selectedMiniCategory.label}
                onChange={handleMiniCategoryChange}
                className="mt-1 block w-full rounded-md border-gray-300  p-2 product-input"
              >
                {selectedCategory.miniCategories.map((miniCategory) => (
                  <option key={miniCategory.label} value={miniCategory.label}>
                    {miniCategory.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="stock"
              className="block font-medium text-gray-700 mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="product-input"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="onDiscount"
              className="block font-medium text-gray-700 mb-2"
            >
              On discount ?
            </label>
            <input
              type="checkbox"
              id="onDiscount"
              name="onDiscount"
              checked={productData.onDiscount}
              onChange={()=>{setProductData(prev=>{return({...prev,onDiscount:!prev.onDiscount})})}}
              className="product-input ml-1 w-6 h-6"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block font-medium text-gray-700 mb-2"
            >
              Discount Price :
            </label>
            <input
              type="number"
              id="discountedPrice"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              className="product-input"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Product Images
          </h2>
          <div
            className="grid grid-cols-3 gap-4 mb-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {productData.images.map((image, index) => (
              <div
                key={image.id}
                className="relative"
                data-index={index}
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
              >
                <img
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleImageDelete(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                >
                  <svg
                    className="h-4 w-4"
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
            ))}
            {newImages.map((image, index) => (
              <div
                key={image.id}
                className="relative"
                data-index={index + productData.images.length}
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
              >
                <img
                  src={image.url}
                  alt="New Product Image"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleNewImageDelete(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                >
                  <svg
                    className="h-4 w-4"
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
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="button inline-block"
          >
            Add Image
          </button>
        </div>
      </div>
      <br/><br/>
      <div className="flex  items-center w-full space-x-4">
  <button
    onClick={handleSaveChanges}
    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded my-8"
  >
    Save Changes
  </button>
  <button
    onClick={handleDelete}
    className="bg-red-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded my-8"
  >
    Delete Product
  </button>
  <button
    onClick={handleCancel}
    className="bg-green-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded my-8"
  >
    Cancel
  </button>
</div>

    </div>
  );
};
export default EditableProductDetailsPage;
