import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://rocky-cliffs-16368.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Please, try again",
        });
      });
  }, []);
  return products;
};

export default useProducts;
