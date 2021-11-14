import React from "react";
import { Carousel } from "react-bootstrap";
import "./../assets/css/slider.css";
import Slider1 from "./../assets/images/slider/1.jpg";
import Slider2 from "./../assets/images/slider/2.jpg";
import Slider3 from "./../assets/images/slider/3.jpg";
import Slider4 from "./../assets/images/slider/4.jpg";
const Slider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={Slider1} alt="Slider Img" />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={Slider2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={Slider3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={Slider4} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
