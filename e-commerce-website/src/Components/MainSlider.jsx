import React from "react";
import Slider from "react-slick";
import sliderImage2 from "../assets/images/slider/slider-image-1.jpeg"
import sliderImage1 from "../assets/images/slider/slider-image-3.jpeg"
import sliderImage3 from "../assets/images/slider/slider-image-2.jpeg"

import groceryBanner from "../assets/images/slider/grocery-banner.png"
import groceryBanner2 from "../assets/images/slider/grocery-banner-2.jpeg"

const MainSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };


    return (
        <div className="mainSlider container">
            <div className="row g-0">
                <div className="col-md-9 ">
                    <Slider {...settings}>
                        <img src={sliderImage1} alt="slider" width="100%" height="360" />
                        <img src={sliderImage2} alt="slider" width="100%" height="360" />
                        <img src={sliderImage3} alt="slider" width="100%" height="360" />
                    </Slider>
                </div>
                <div className="col-md-3">
                    <img src={groceryBanner} alt="slider" width="100%" height="180" />
                    <img src={groceryBanner2} alt="slider" width="100%" height="180" />
                </div>
            </div>
        </div>
    )
};

export default MainSlider;
