import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import useContexts from "../hooks/useContexts.js";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const AddReview = () => {
  const history = useHistory();
  const [rating, setRating] = useState(5);
  const { displayName, email, photoURL } = useContexts();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.img = photoURL || "https://i.ibb.co/5GzXkwq/user.png";
    data.email = email;
    data.rating = rating;

    Swal.fire({
      icon: "warning",
      title: "Do you want to rate?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://rocky-cliffs-16368.herokuapp.com/addReview", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire("Publish on review section!", "", "success");
              history.replace("/");
            }
          });
      }
    });

    reset();
  };
  return (
    <section>
      <h3 className="text-center text-capitalize fw-bold">Give a feedback</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-100 form-main">
        <div
          className="p-3 mx-auto  bg-white"
          style={{ borderRadius: "15px", maxWidth: "50rem" }}
        >
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Your Name
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={displayName}
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <h6 className="fw-bold mt-1 mb-2">Your Rating</h6>
              <Rating
                className="text-warning fs-3"
                emptySymbol="far fa-star "
                fullSymbol="fas fa-star "
                onChange={(rate) => setRating(rate)}
                initialRating={rating}
                fractions={2}
              />
              <h4 className="d-inline-block ms-2">{rating}</h4>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Enter your address"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2">
            <Form.Group as={Col} md={12}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Description
              </Form.Label>
              <Form.Control
                style={{ height: "10rem" }}
                type="text"
                as="textarea"
                {...register("description", { required: true })}
                placeholder="Enter a description"
              />
            </Form.Group>
          </Row>
          <div className="mt-4">
            <Button
              type="submit"
              className="btn-main"
              style={{ padding: ".6rem 2rem" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default AddReview;
