import React from "react";
import { Card, Col } from "react-bootstrap";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";

const Product = ({ product }) => {
  const { _id, title, desc, price, img, rating, totalReview } = product;
  return (
    <Col className="my-3 text-center" sm={12} md={6} lg={4}>
      <Zoom>
        <Card style={{ height: "400px" }} className="mx-1  shadow">
          <div className="text-center">
            <Card.Img
              style={{ width: "150px", height: "150px" }}
              variant="top"
              src={img}
            />
          </div>
          <Card.Body>
            <Card.Title className="text-uppercase">{title}</Card.Title>
            <Card.Title>Price: {price}.00TK</Card.Title>
            <Card.Text>{desc}</Card.Text>
            <Card.Text>
              Rating:{" "}
              <Rating
                className="text-danger"
                initialRating={rating}
                readonly
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
              />{" "}
              {rating}
            </Card.Text>
            <Card.Text>Total Review: {totalReview}</Card.Text>
            <Link to={`/placeorder/${_id}`}>
              <button className="btn mt-2 btn-primary">Buy Now</button>
            </Link>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Product;
