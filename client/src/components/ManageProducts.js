import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageProducts = () => {
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

  const deleteProduct = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rocky-cliffs-16368.herokuapp.com/deleteProduct/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const modifiedOrders = products.filter(
                (order) => order._id !== id
              );
              setProducts(modifiedOrders);
              Swal.fire("Deleted!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div
      className="px-3 pt-2 mx-md-4 bg-white"
      style={{ borderRadius: "15px" }}
    >
      <h3 className="text-center fw-bold mb-4">Manage all orders</h3>

      <Table hover borderless responsive>
        <thead className="bg-light">
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {products.map((product) => {
          return (
            <tbody key={product._id} style={{ fontWeight: "500" }}>
              <tr>
                <td>{product.title}</td>
                <td>{product.desc}</td>
                <td>${product.price}</td>
                <td className="text-center">
                  <Link to={`addProduct/${product._id}`}>
                    <Button
                      variant="outline-success"
                      className="p-1 me-2 mb-0"
                      onClick={() => {}}
                    >
                      <i className="fas fa-edit  mx-1"></i>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    className="p-1 ml-3 mb-0"
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  >
                    <i className="fas mx-1 fa-trash"></i>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default ManageProducts;
