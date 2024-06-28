import React from "react";

const QuantityInput = ({ setQuantity, quantity }) => {
    const quantityList = Array(10)
        .fill()
        .map((_, index) => index + 1);

    return (
        <select
            className="custom-select"
            id="allocation-input"
            onChange={(event) => setQuantity(event.target.value)}
        >
            <option defaultValue>{quantity}</option>
            {quantityList.map((quantity) => (
                <option value={quantity} key={quantity}>
                    {quantity}
                </option>
            ))}
        </select>
    );
};

export default QuantityInput;
