import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";
import useContexts from "../hooks/useContexts.js";
import Swal from "sweetalert2";

const PlaceOrder = () => {
  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { displayName, email } = useContexts();
  useEffect(() => {
    fetch(`https://rocky-cliffs-16368.herokuapp.com/placeorder/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    Swal.fire({
      icon: "warning",
      title: "Do you want to confirm your order?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://rocky-cliffs-16368.herokuapp.com/placeorder", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...data, ...product }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire("Confirmed!", "", "success");
              history.replace("/dashboard/myorder");
            }
          });
      }
    });
  };

  return (
    <>
      {!product.title ? (
        <div className="text-center my-5 private-spinner py-5">
          <Spinner variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Container>
          <Row className="align-items-center">
            <Col sm={12} style={{ borderRight: "1px solid #ddd" }} md={6}>
              <img width="100%" src={product.img} alt="" />
            </Col>
            <Col className="my-4" sm={12} md={6}>
              <h2 className="text-center feature">Please confirm order</h2>
              <div className="mt-5">
                <h4>{product.desc}</h4>
                <h3 className="mt-3">Price: {product.price}.00TK</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mt-3">
                    <Col sm={12} md={6}>
                      <label htmlFor="name">
                        <b>Name</b>
                      </label>
                      <input
                        id="name"
                        required
                        type="text"
                        className="form-control"
                        {...register("name")}
                        defaultValue={displayName}
                        placeholder="your name"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <label htmlFor="email">
                        <b>Email</b>
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        readOnly
                        defaultValue={email}
                        className="form-control"
                        {...register("email")}
                        placeholder="your email"
                      />
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <label htmlFor="address">
                        <b>Address</b>
                      </label>
                      <input
                        id="address"
                        required
                        type="text"
                        className="form-control"
                        {...register("address")}
                        placeholder="Enter your address"
                      />
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <label htmlFor="phone">
                        <b>Phone</b>
                      </label>
                      <input
                        id="phone"
                        required
                        type="number"
                        className="form-control"
                        {...register("phone")}
                        placeholder="Enter your phone"
                      />
                    </Col>
                  </Row>
                  <input
                    value="Order Now"
                    className="btn btn-primary"
                    type="submit"
                  />
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PlaceOrder;
