import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { GlobalContext } from '../../Context/globalContext';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import NotFoundProduct from '../NotFoundProduct/NotFoundProduct';

const Products = () => {
    const [products, setProducts] = useState([])
    const { getAllProducts } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        setLoading(true);
        try {
            let data = await getAllProducts()
            setProducts(data.data.data)
        } catch (error) {
            console.error("Error fetching product :", error);
        } finally {
            setLoading(false);
        }
    };

    // async function getAllProducts() {
    //     const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //     console.log('products:', response.data.data)
    //     setProducts(response.data.data)
    // }

    useEffect(() => {
        getProducts()
    }, [])

    if (loading) {
        return (
            <SpinnerLoading />
        );
    }

    if (!products) {
        return (
            <NotFoundProduct />
        );
    }

    return (
        <div className='products container mt-30'>
            <h5>Products: </h5>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
