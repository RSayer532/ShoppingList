import React from "react";
import { checkNaN } from "./common";

// Type definition for props of the QuantityInput component
interface QuantityInputProps {
    handleQuantity: Function;
    currentQuantity: number;
}
const QuantityInput = ({ handleQuantity, currentQuantity }: QuantityInputProps) => {
    return (
        <input
            type="number"
            aria-label="Quantity"
            value={checkNaN(currentQuantity)}
            className="form-control"
            aria-describedby="quantity-input"
            onChange={(event) => handleQuantity(event.target.value)}
        />
    );
};

export default QuantityInput;
