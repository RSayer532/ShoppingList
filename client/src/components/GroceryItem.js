import React, { useState } from "react";
import RemoveItem from "./RemoveItem";
import { QuantityInput } from ".";
import { useDispatch } from "react-redux";
import { modifyQuantity } from "../states/grocerySlice";

const GroceryItem = ({ grocery }) => {
    // Global states
    const dispatch = useDispatch();

    // Local states/variables
    const [quantity, setQuantity] = useState(grocery.quantity);

    // No checking required on value, as values available to user are only those within budget (see QuantityInput component)
    const handleQuantity = (value) => {
        setQuantity(value);
        dispatch(modifyQuantity({ quantity: value, name: grocery.name }));
    };

    return (
        <tr>
            {/* Item name */}
            <td>{grocery.name}</td>
            {/* Quantity dropdown */}
            <td>
                <QuantityInput
                    setQuantity={handleQuantity}
                    currentQuantity={quantity}
                    price={grocery.price}
                />
            </td>
            {/* Item price */}
            <td>
                {`\u00A3`} {grocery.price.toFixed(2)}
            </td>
            {/* Total price */}
            <td>
                {`\u00A3`} {(grocery.price * quantity).toFixed(2)}
            </td>
            {/* Delete button */}
            <td>
                <RemoveItem grocery={grocery} />
            </td>
        </tr>
    );
};

export default GroceryItem;
