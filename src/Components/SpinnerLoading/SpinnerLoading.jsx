import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const SpinnerLoading = () => {
    return (
        // <div class="layer layer-auto active">
        //     <div class="btn-loader"></div>
        // </div>
        <div className="spinner">
            <Spinner animation="border" role="status">
                <span className="sr-only"></span>
            </Spinner>

        </div>
    )
}

export default SpinnerLoading