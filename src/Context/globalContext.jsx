import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {

    const [numOfCartItems, setNumOfCartItems] = useState(0)

    let headers = {
        token: localStorage.getItem("token")
    }

    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then((response) => response)
            .catch((err) => err)
    }
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((response) => response)
            .catch((err) => err)
    }

    function addProductToCart(id) {

        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: id,
            },
            {
                headers,
            }
        )
            .then((response) => {
                setNumOfCartItems(response.data.numOfCartItems)
                return response;
            })
            .catch((err) => {
                console.error('error', err);
                return err;
            });
    }


    function GetLoggedUserCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers,
            }
        )
            .then((response) => {
                return response;
            })
            .catch((err) => err)
    }

    function UpdateCartProductQuantity(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                count,
            },
            {
                headers,
            }
        )
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.error('error', err);
                return err;
            });
    }

    function RemoveCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                headers,
            }
        )
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.error('error', err);
                return err;
            });
    }

    function getAllCategoriesSlider() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
            .then((response) => response)
            .catch((error) => error)
    }

    async function initCartCount() {
        let { data } = await GetLoggedUserCart()
        setNumOfCartItems(data.numOfCartItems)
    }

    useEffect(() => {
        initCartCount()
    }, [])


    return (
        <GlobalContext.Provider
            value={{
                getAllProducts,
                getProductDetails,
                addProductToCart,
                numOfCartItems,
                setNumOfCartItems,
                GetLoggedUserCart,
                UpdateCartProductQuantity,
                RemoveCartItem,
                getAllCategoriesSlider
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
