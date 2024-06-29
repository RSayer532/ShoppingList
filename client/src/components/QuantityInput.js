import React from 'react';

const QuantityInput = ({handleQuantity, currentQuantity}) => {

    return (
        <input
            type="number"
            aria-label="Quantity"
            value={currentQuantity}
            className="form-control"
            aria-describedby="quantity-input"
            onChange={(event) => handleQuantity(event.target.value)}
        />
    )
}

export default QuantityInput;