import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from '../../Context/globalContext';
import { Card, Button, Container, Row, Col, Image, Badge, Spinner } from 'react-bootstrap';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import NotFoundProduct from '../NotFoundProduct/NotFoundProduct';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    let { detailsId } = useParams();
    const { getProductDetails, addProductToCart } = useContext(GlobalContext);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            let data = await getProductDetails(detailsId);
            setProductDetails(data.data.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCard = async (id) => {
        try {
            let data = await addProductToCart(id);
            if (data.data.status == "success") {
                toast.success(data.data.message);
            }

        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [detailsId, getProductDetails]);

    if (loading) {
        return (
            <SpinnerLoading />
        );
    }

    if (!productDetails) {
        return (
            <NotFoundProduct />
        );
    }

    return (
        <div className="productDetails container">
            <ToastContainer />
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <Image src={productDetails.imageCover} fluid />
                    </Col>
                    <Col md={7} className='d-flex justify-content-between align-items-center'>
                        <Card className="full-width">
                            <Card.Body className=''>
                                <div>
                                    <Card.Title>{productDetails.title}</Card.Title>
                                    <Card.Text className="text-muted">{productDetails.description}</Card.Text>
                                </div>
                                <div className="mb-0 mt-15">
                                    <Card.Text>{productDetails.category.name}</Card.Text>
                                    <div className='d-flex justify-content-between'>
                                        <Card.Text>{productDetails.price} EGP</Card.Text>
                                        <Card.Text>
                                            <span style={{ color: 'gold' }}>★</span>{productDetails.ratingsAverage}
                                        </Card.Text>
                                    </div>
                                </div>
                                <Button variant="success" size="lg" onClick={() => addToCard(productDetails.id)}>add to cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;
