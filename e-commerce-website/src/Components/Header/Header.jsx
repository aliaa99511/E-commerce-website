import React, { useContext, useEffect, useState } from 'react';
import logo from "./../../assets/images/freshcart-logo.svg";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '../../Context/globalContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingCart } from '../../Redux/CartSlice';

const Header = () => {
    let token = localStorage.getItem("token")
    const navigate = useNavigate();
    // const { numOfCartItems } = useContext(GlobalContext);

    const dispatch = useDispatch();

    const { numOfCartItems } = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        dispatch(fetchShoppingCart());
    }, [dispatch]);

    let handelSignOut = () => {
        localStorage.removeItem("token")
        navigate("login");
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to={"/"} className="navbar-brand">
                    <img src={logo} alt="" width="110" height="30" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        token ?
                            <>
                                <Nav className="me-auto">
                                    <Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
                                    <Link to={"cart"} className="nav-link">Cart</Link>
                                    <Link to={"categories"} className="nav-link">Categories</Link>
                                    <Link to={"products"} className="nav-link">Products</Link>
                                </Nav>
                                <div className='d-flex'>

                                    <div className='cart-icon position-relative mr-15 pointer'>
                                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                            {numOfCartItems && numOfCartItems}
                                        </span>
                                        <Link to={"cart"} className="nav-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="22px">
                                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className='mr-auto pointer' onClick={handelSignOut}>
                                        SignOut
                                    </div>
                                </div>
                            </>
                            :
                            <div className="d-flex ml-auto">
                                <div className='mr-10'>
                                    <Link to={"Register"} className="nav-link">Register</Link>
                                </div>
                                <div>
                                    <Link to={"Login"} className="nav-link">Login</Link>
                                </div>
                            </div>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};


export default Header;
