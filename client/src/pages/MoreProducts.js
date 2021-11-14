import React from "react";
import Product from "../components/Product.js";

const MoreProducts = () => {
  const products = [];
  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
};

export default MoreProducts;
