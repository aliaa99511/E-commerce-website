import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../../Context/globalContext";
import Slider from "react-slick";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import NotFoundProduct from "../NotFoundProduct/NotFoundProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../Redux/ProductSlice";

const CategoriesSlider = () => {

    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const { getAllCategoriesSlider } = useContext(GlobalContext);

    const { data: categories, loading } = useSelector((state) => state.products.categories)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    // async function getCategoriesSlider() {
    //     setLoading(true);
    //     try {
    //         let { data } = await getAllCategoriesSlider();
    //         setCategories(data.data);
    //     } catch (error) {
    //         console.error("Error fetching categories:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     getCategoriesSlider();
    // }, []);

    if (loading) {
        return (
            <SpinnerLoading />
        );
    }

    if (!categories) {
        return (
            <NotFoundProduct />
        );
    }

    return (
        <div className="categories container">
            <h5>Categories: </h5>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category._id}>
                        <img src={category.image} alt={category.name} className="mb-15" width="100%" height="200px" />
                        <h6>{category.name}</h6>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoriesSlider;
