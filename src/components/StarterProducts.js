import { products } from "@/data/models";
import { randomProductPosition, randomProductRotation } from "@/utils/helpers";
import Product from "@/components/Product";

const StarterProducts = () => {
  return Object.keys(products).map((key, index) => {
    return (
      <Product
        key={index}
        product={key}
        position={randomProductPosition()}
        rotation={randomProductRotation()}
      />
    );
  });
};

export default StarterProducts;
