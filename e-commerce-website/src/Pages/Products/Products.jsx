import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/ProductSlice";
import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
import NotFoundProduct from "../../Components/NotFoundProduct/NotFoundProduct";
import ProductItem from "../../Components/Products/ProductItem";
// import { decrease, increase, increaseByAmount } from "../../Redux/CounterSlice";

const Products = () => {
    const dispatch = useDispatch();

    const { data: products, loading } = useSelector((state) => state.products);
    // let { counter } = useSelector((state) => state.counter)

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);

    if (loading) {
        return <SpinnerLoading />;
    }

    if (!products.data || products.data.length === 0) {
        return <NotFoundProduct />;
    }

    return (
        <div className="products container mt-30">
            {/* <h4>{counter}</h4>
            <Button onClick={() => dispatch(increase())}>increase</Button>{" "}
            <Button onClick={() => dispatch(decrease())}>decrease</Button>{" "}
            <Button onClick={() => dispatch(increaseByAmount(5))}>increaseByAmount</Button> */}

            <h5>Products: </h5>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {products.data.map((product) => (
                    <div className="col" key={product.id}>
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
