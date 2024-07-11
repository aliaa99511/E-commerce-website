
// // with context

// import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../../Context/globalContext";
// import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
// import NotFoundProduct from "../../Components/NotFoundProduct/NotFoundProduct";
// import CartItem from "../../Components/Cart/CartItem";
// import '../../Style/Cart.css'
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { Helmet } from "react-helmet";
// import EmptyCart from "../../Components/Cart/EmptyCart";

// const Cart = () => {
//     const { GetLoggedUserCart, UpdateCartProductQuantity, RemoveCartItem, setNumOfCartItems } = useContext(GlobalContext)
//     const [cartItemData, setCartItemData] = useState([])
//     const [totalPrice, setTotalPrice] = useState()
//     const [loading, setLoading] = useState(true);

//     async function ShoppingCart() {
//         setLoading(true);
//         try {
//             let { data } = await GetLoggedUserCart()
//             setCartItemData(data.data.products)
//             setTotalPrice(data.data.totalCartPrice)
//         } catch (error) {
//             console.error("Error fetching product :", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function UpdateQuantity(id, count) {
//         let { data } = await UpdateCartProductQuantity(id, count)
//         console.log('dataQuant', data)
//         setCartItemData(data.data.products)
//     }

// async function RemoveItem(id) {
//     let { data } = await RemoveCartItem(id)
//     if (data.status == "success") {
//         toast.success("product delete successfully");
//         setCartItemData(data.data.products)
//         setNumOfCartItems(data.numOfCartItems)
//     }
// }
//     useEffect(() => {
//         ShoppingCart()
//     }, [])


//     if (loading) {
//         return (
//             <SpinnerLoading />
//         );
//     }

//     if (!cartItemData) {
//         return (
//             <NotFoundProduct />
//         );
//     }

//     if (cartItemData.length == 0) {
//         return (
//             <EmptyCart />
//         );
//     }

//     if (!cartItemData || cartItemData.length === 0) {
//         return <NotFoundProduct />;
//     }


//     if (cartItemData.length == 0) {
//         return (
//             <EmptyCart />
//         );
//     }

//     return (
//         <div className="cart">
//             <ToastContainer />
//             <Helmet>
//                 <title>My Cart</title>
//             </Helmet>

//             <div className="container">
//                 <h4 className="mt-4">Shop Cart :</h4>
//                 <h6 className="mt-2 bold">Total Cart Price : {totalPrice} EGP</h6>

//                 <div className="card">
//                     {cartItemData.length > 0 &&
//                         cartItemData.map(item => (
//                             <CartItem
//                                 key={item._id}
//                                 item={item}
//                                 RemoveItem={RemoveItem}
//                                 UpdateQuantity={UpdateQuantity} />
//                         ))
//                     }
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Cart;




// with redux

import React, { useEffect, useState } from "react";
import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
import CartItem from "../../Components/Cart/CartItem";
import '../../Style/Cart.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import EmptyCart from "../../Components/Cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCart, removeCartItem, updateCartProductQuantity } from "../../Redux/CartSlice";

const Cart = () => {
    const { data: cartItemData, totalPrice, loading } = useSelector(state => state.cart.cartItems);
    // console.log("cartItemData", cartItemData);
    // console.log("totalPrice", totalPrice);

    const dispatch = useDispatch()

    const handleCartQuantity = (id, count) => {
        dispatch(updateCartProductQuantity({ id, count }))
    }

    const handleRemoveItem = (id) => {
        dispatch(removeCartItem(id))
    };

    useEffect(() => {
        dispatch(fetchShoppingCart())
    }, []);


    if (loading) {
        return (
            <SpinnerLoading />
        );
    }

    if (!cartItemData || cartItemData.length === 0) {
        return <EmptyCart />;
    }

    // if (cartItemData) {
    //     return (
    //         <SpinnerLoading />
    //     );
    // }

    return (
        <div className="cart">
            <ToastContainer />
            <Helmet>
                <title>My Cart</title>
            </Helmet>
            <div className="container">
                <h4 className="mt-4">Shop Cart :</h4>
                <h6 className="mt-2 bold">Total Cart Price : {totalPrice} EGP</h6>
                <div className="card">
                    {cartItemData?.length > 0 &&
                        cartItemData.map(item => (
                            <CartItem
                                key={item._id}
                                item={item}
                                RemoveItem={handleRemoveItem}
                                UpdateQuantity={handleCartQuantity}
                            />
                        ))}
                </div>

            </div>
        </div>
    );
};

export default Cart;