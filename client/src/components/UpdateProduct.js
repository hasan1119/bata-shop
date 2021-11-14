import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import "./../assets/css/AddService.css";

const UpdateProduct = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://rocky-cliffs-16368.herokuapp.com/updateOne/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  const onSubmit = async (data) => {
    data.rating = 5;
    data.totalReview = 1;
    Swal.fire({
      icon: "warning",
      title: "Are you sure to update this product?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://rocky-cliffs-16368.herokuapp.com/updateProduct?id=${id}`,
          {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              reset();
              Swal.fire("Updated!", "", "success");
              history.replace("/products");
            } else {
              Swal.fire("You don't change any field!", "", "warning");
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong!",
              html: "Please, try again",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
    reset();
  };

  return (
    <>
      <section className="add-service">
        <h3 className="text-center mb-3">Add a new product</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="pb-5 mx-auto  bg-white form-main"
            style={{ borderRadius: "15px", maxWidth: "85rem" }}
          >
            <Row className="justify-content-center">
              <Form.Group as={Col} md={6} sm={12} className="mr-md-5">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Service Title
                </Form.Label>
                <Form.Control
                  defaultValue={product.title}
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Enter product title"
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12}>
                <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={product.price}
                  {...register("price", { required: true })}
                  placeholder="Enter product price"
                />
              </Form.Group>
            </Row>

            <Row>
              <InputGroup as={Col} className="mb-3 mt-md-3">
                <Form.Label
                  className="d-block w-100"
                  style={{ fontWeight: "bold" }}
                >
                  Photo URL
                </Form.Label>
                <InputGroup.Text id="basic-addon1">
                  <i className="fas fa-link"></i>
                </InputGroup.Text>
                <FormControl
                  defaultValue={product.img}
                  id="photo"
                  type="text"
                  {...register("img", { required: true })}
                  placeholder="Enter a product image"
                />
              </InputGroup>
            </Row>
            <Row>
              <Form.Group as={Col} md={12} sm={12} className="mr-md-5 mt-md-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ height: "10rem" }}
                  defaultValue={product.desc}
                  type="text"
                  as="textarea"
                  {...register("desc", { required: true })}
                  placeholder="Enter product description"
                />
              </Form.Group>
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" className="submit-btn btn-main">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default UpdateProduct;
