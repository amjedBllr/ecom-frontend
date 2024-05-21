import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    miniCategories: [
      { link: "/client/products/type/Computers&Tablets", label: "Computers & Tablets" },
      { link: "/client/products/type/CellPhones", label: "Cell Phones" },
      { link: "/client/products/type/TV%20&%20Home%20Theater", label: "TV & Home Theater" },
      { link: "/client/products/type/Video%20Games%20&%20Consoles", label: "Video Games & Consoles" },
    ],
  },
  {
    name: "Accessories",
    miniCategories: [
      { link: "/client/products/type/Watches", label: "Watches" },
      { link: "/client/products/type/Jewelry", label: "Jewelry" },
      { link: "/client/products/type/Handbags%20&%20Wallets", label: "Handbags & Wallets" },
      { link: "/client/products/type/Sunglasses", label: "Sunglasses" },
    ],
  },
  {
    name: "Clothes",
    miniCategories: [
      { link: "/client/products/type/Men's%20Clothing", label: "Men's Clothing" },
      { link: "/client/products/type/Women's%20Clothing", label: "Women's Clothing" },
      { link: "/client/products/type/Kid's%20Clothing", label: "Kid's Clothing" },
      { link: "/client/products/type/Shoes", label: "Shoes" },
    ],
  },
  {
    name: "Kitchen",
    miniCategories: [
      { link: "/client/products/type/Cookware", label: "Cookware" },
      { link: "/client/products/type/Small%20Appliances", label: "Small Appliances" },
      { link: "/client/products/type/Kitchen%20Utensils%20&%20Gadgets", label: "Kitchen Utensils & Gadgets" },
      { link: "/client/products/type/Dinnerware", label: "Dinnerware" },
    ],
  },
  {
    name: "Gaming",
    miniCategories: [
      { link: "/client/products/type/Video%20Games", label: "Video Games" },
      { link: "/client/products/type/Gaming%20Consoles", label: "Gaming Consoles" },
      { link: "/client/products/type/Gaming%20Accessories", label: "Gaming Accessories" },
      { link: "/client/products/type/PC%20Gaming", label: "PC Gaming" },
    ],
  },
  {
    name: "Home Garden",
    miniCategories: [
      { link: "/client/products/type/Furniture", label: "Furniture" },
      { link: "/client/products/type/Decor", label: "Decor" },
      { link: "/client/products/type/Gardening%20Supplies", label: "Gardening Supplies" },
      { link: "/client/products/type/Outdoor%20Living", label: "Outdoor Living" },
    ],
  },
  {
    name: "Books",
    miniCategories: [
      { link: "/client/products/type/Fiction", label: "Fiction" },
      { link: "/client/products/type/Non-fiction", label: "Non-fiction" },
      { link: "/client/products/type/Children's%20Books", label: "Children's Books" },
      { link: "/client/products/type/Textbooks", label: "Textbooks" },
    ],
  },
  {
    name: "Sports",
    miniCategories: [
      { link: "/client/products/type/Exercise%20&%20Fitness", label: "Exercise & Fitness" },
      { link: "/client/products/type/Outdoor%20Recreation", label: "Outdoor Recreation" },
      { link: "/client/products/type/Sports%20Gear", label: "Sports Gear" },
      { link: "/client/products/type/Fan%20Shop", label: "Fan Shop" },
    ],
  },
  {
    name: "Automotive",
    miniCategories: [
      { link: "/client/products/type/Car%20Parts", label: "Car Parts" },
      { link: "/client/products/type/Car%20Accessories", label: "Car Accessories" },
      { link: "/client/products/type/Motorcycles%20&%20ATVs", label: "Motorcycles & ATVs" },
      { link: "/client/products/type/Tires%20&%20Wheels", label: "Tires & Wheels" },
    ],
  },
  {
    name: "Health",
    miniCategories: [
      { link: "/client/products/type/Makeup", label: "Makeup" },
      { link: "/client/products/type/Skin%20Care", label: "Skin Care" },
      { link: "/client/products/type/Hair%20Care", label: "Hair Care" },
      { link: "/client/products/type/Personal%20Care", label: "Personal Care" },
    ],
  },
  {
    name: "Toys & Games",
    miniCategories: [
      { link: "/client/products/type/Action%20Figures", label: "Action Figures" },
      { link: "/client/products/type/Board%20Games", label: "Board Games" },
      { link: "/client/products/type/Dolls%20&%20Plush", label: "Dolls & Plush" },
      { link: "/client/products/type/Educational%20Toys", label: "Educational Toys" },
    ],
  },
];

function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <ul className="flex text-accent bg-gray-200 md:flex-row gap-2 md:gap-0 md:justify-center md:items-center md:flex-wrap sm:hidden">
      {categories.map((category, index) => (
        <li
          key={index}
          className="relative md:text-[12px] items-center flex-grow border-l-[0.1px] border-solid border-blue_gray-500 p-[15px] md:p-5 text-md font-medium text-[13px] sm:flex-wrap overflow-visible"
        >
          <div
            className="flex cursor-pointer"
            onClick={() =>
              setSelectedCategory(selectedCategory === index ? -1 : index)
            }
          >
            <p className="flex justify-center items-center gap-2 md:text-[12px]">
              {category.name}{" "}
              <span
                className={
                  selectedCategory === index ? "transform rotate-180" : ""
                }
              >
                <FaChevronDown />
              </span>
            </p>
          </div>
          {selectedCategory === index && (
            <ul className="absolute left-0 md:block bg-white w-full mt-2 rounded-md shadow-lg z-10">
              {category.miniCategories.map((miniCategory, miniIndex) => (
                <li key={miniIndex} className="border-b border-gray-200">
                  <Link
                    to={miniCategory.link}
                    className="block p-3 hover:bg-gray-100 transition-colors"
                  >
                    {miniCategory.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
