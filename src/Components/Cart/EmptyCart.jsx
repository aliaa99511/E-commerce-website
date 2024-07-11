import React from 'react'
import emptyCart from '../../assets/images/empty-cart.png'

const EmptyCart = () => {
    return (
        <div className='emptyCart'>
            <img src={emptyCart} alt="Empty Cart" />
        </div>
    )
}

export default EmptyCart