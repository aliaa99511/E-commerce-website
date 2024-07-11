import React from "react";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

// <Footer />
const Layout = () => {
    return (
        <>
            <Header />
            {/* <div className='container'> */}
            <Outlet></Outlet>
            {/* </div> */}

        </>
    );
};

export default Layout;
