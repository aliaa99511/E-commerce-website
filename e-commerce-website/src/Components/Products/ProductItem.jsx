import React from "react";
import { Card } from 'react-bootstrap';
import '../../Style/Products.css'
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
    const truncateTitle = (title) => {
        const words = title.split(' ');
        return words.length > 3 ? words.slice(0, 3).join(' ') : title;
    }

    return (
        <Link to={`details/${product.id}`}>
            <Card>
                <Card.Img variant="top" src={product.imageCover} height={"260px"} width={"100%"} />
                <Card.Body className='d-flex justify-content-between flex-column'>
                    <div>
                        <Card.Title>{truncateTitle(product.title)}</Card.Title>
                        <Card.Text className="truncate text-muted">{product.description}</Card.Text>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Card.Text>{product.price} EGP</Card.Text>
                        <Card.Text>
                            <span style={{ color: 'gold' }}>★</span>{product.ratingsAverage}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default ProductItem;
