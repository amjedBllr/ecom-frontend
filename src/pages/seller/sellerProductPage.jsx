import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaShoppingCart, FaStar, FaChevronDown } from "react-icons/fa";
import ReactStarsRating from "react-rating-stars-component";
import { useLocation } from "react-router-dom";

// Start of resources arrays
const productDetails = {
  imgUrl:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sellerName: "nike",
  description:
    "A B&W limited edition of Nike shoes A B&W limited edition of Nike shoes A B&W limited edition of Nike shoes",
  productName: "Air Force 1",
  price: "455$",
};
const reviews = [
  {
    id: 1,
    rating: 4.5,
    comment: "Great product! Fits perfectly and looks amazing.",
    name: "John Doe",
    date: "2023-05-01",
  },
  {
    id: 2,
    rating: 3.0,
    comment:
      "It's a decent product, but I expected better quality for the price.",
    name: "Jane Smith",
    date: "2023-04-25",
  },
  // Add more reviews here
];
// related products
const relatedProducts = [
  {
    id: 1,
    name: "Nike Air Max 90",
    price: "120$",
    imgUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
  {
    id: 2,
    name: "Adidas Superstar",
    price: "90$",
    imgUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
  {
    id: 3,
    name: "Puma Suede Classic",
    price: "80$",
    imgUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
];
// End of resources array

const SellerProductPage = () => {
  const location = useLocation();
  const product = location.state?.product || productDetails;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const images = [
    {
      original: product.imgUrl,
      thumbnail: product.imgUrl,
    },
    {
      original: product.imgUrl,
      thumbnail: product.imgUrl,
    },
    {
      original: product.imgUrl,
      thumbnail: product.imgUrl,
    },
    // Add additional images if available
  ];

  // End of state variables
  // Handle functions

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      setComments([...comments, { text: comment, rating }]);
      setComment("");
      setRating(0);
    }
  };

  // End of handle functions
  return (
    <>
      <div className="max-w-7xl mx-auto px-12 sm:px-6 lg:px-8 py-8 border-2 border-gray-500 rounded-lg mt-10 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-16 sm:grid-cols-1 lg:padding-x">
          {/* Image Carousel */}
          <div className="flex flex-col justify-between  gap-16">
            <div className="image-gallery-container  ">
              <ImageGallery
                items={images}
                showThumbnails={true}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={true}
                lazyLoad={true}
                slideDuration={300}
                slideInterval={5000}
                swipingTransitionDuration={300}
                thumbnailTransitionDurations={300}
                additionalClass="rounded-lg shadow-lg h-full"
              />
            </div>
            {/* Comments Section */}
            <form onSubmit={handleCommentSubmit} className="mt-30">
              <div className="flex items-center mb-2">
                <ReactStarsRating
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={rating}
                  onChange={handleRatingChange}
                  isHalf={true}
                  emptyIcon={<FaStar />}
                  halfIcon={<FaStar />}
                  filledIcon={<FaStar />}
                />
                <span className="text-gray-600 ml-2">
                  ({rating.toFixed(1)})
                </span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Submit Comment
              </button>
            </form>
          </div>

          {/* Product Details Section */}
          <div className="py-2">
            <h1 className="text-3xl font-bold mb-4 py-4">{product.productName}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <ReactStarsRating
                count={5}
                size={24}
                activeColor="#ffd700"
                value={rating}
                onChange={handleRatingChange}
                isHalf={true}
                emptyIcon={<FaStar />}
                halfIcon={<FaStar />}
                filledIcon={<FaStar />}
              />
              <span className="text-gray-600 ml-2">({rating.toFixed(1)})</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {product.price}
            </p>
            <p className="text-gray-600 mb-4">
              Sold by:{" "}
              <span className="font-semibold">{product.sellerName}</span>
            </p>
            <div className="flex flex-wrap items-center mb-4">
              <div className="mr-4 mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="mr-4 mb-4">
                <label
                  htmlFor="color"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Color
                </label>
                <div className="relative">
                  <select
                    id="color"
                    name="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-40 px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Color</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    {/* Add more color options */}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="mr-4 mb-4">
                <label
                  htmlFor="size"
                  className="block text-sm  font-semibold text-gray-700 mb-1"
                >
                  Size
                </label>
                <div className="relative">
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-40 px-4 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500  appearance-none"
                  >
                    <option value="">Select Size</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    {/* Add more size options */}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-100">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
              <FaShoppingCart className="inline-block mr-2" />
              Add to Cart
            </button>
            <div className="border-t border-gray-300 pt-4 mt-4">
              {reviews.length > 0 ? (
                <>
                  <ReviewsSection reviews={reviews} />
                </>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProductPage;

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="border-t border-gray-300 py-6 mt-4">
      <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 pt-4">
          <p className="text-gray-700 ">{review.comment}</p>
          <div className="flex items-center mb-2">
            <ReactStarsRating
              count={5}
              size={16}
              activeColor="#ffd700"
              value={review.rating}
              edit={false}
              isHalf={true}
              emptyIcon={<FaStar />}
              halfIcon={<FaStar />}
              filledIcon={<FaStar />}
            />
            <span className="text-gray-600 ml-2">
              ({review.rating.toFixed(1)})
            </span>
          </div>
          <p className="text-gray-500 mt-1 font-semibold">
            By {review.name} on {review.date}
          </p>
        </div>
      ))}
    </div>
  );
};
