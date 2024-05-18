import ProductCard from "../../components/ProductCard";
import { data, data1, data2 } from "../../constantes/index.js";
import { useParams } from "react-router-dom";
const CategoryPage = () => {
  const { categoryName } = useParams();
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold padding-x my-8">{categoryName}</h1>
      <div className="grid grid-cols-5  gap-x-8 gap-y-8 padding-x sm:flex sm:flex-col my-12">
        {data.slice(0, 5).map((product, index) => {
          console.log(product.imgUrl);
          return (
            <ProductCard
              key={index}
              imgUrl={product.imgUrl}
              sellerName={product.sellerName}
              name={product.productName}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
