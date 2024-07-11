import React from "react";
import Products from "../../Components/Products/Products"
import { Helmet } from "react-helmet";
import CategoriesSlider from "../../Components/Categories/CategoriesSlider";
import MainSlider from "../../Components/MainSlider";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>HomePage</title>
            </Helmet>
            <MainSlider />
            <CategoriesSlider />
            <Products />
        </div>
    )
};

export default Home;
