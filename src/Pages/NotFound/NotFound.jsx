import React from "react";
import notFoundLogo from "../../assets/images/404.png"
import { Container } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container className="d-flex justify-content-center mt-50">
            <img src={notFoundLogo} width={"70%"} alt="" />
        </Container>
    );
};

export default NotFound;
