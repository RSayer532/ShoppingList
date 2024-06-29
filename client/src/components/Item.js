import React, { useState, useEffect } from "react";
import RemoveItem from "./RemoveItem";
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, selectRemaining } from "../states/itemSlice";
import { displayPopup, toggleDisable } from "./common";
import { QuantityInput } from ".";

const Item = ({ item }) => {
    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);

    // Local states/variables
    const [quantity, setQuantity] = useState(item.quantity);
    const [edit, setEdit] = useState(true);
    const [quantityError, setQuantityError] = useState(false);

    useEffect(() => {
        let tempTotal = parseInt(quantity) * parseFloat(item.price);
        // Check that at least one item is valid...??????
        let condition = remaining <= tempTotal || quantity === "";
        toggleDisable(condition, setEdit);
    }, [remaining, quantity, item]);

    // Check whether the input quantity is valid, given the price and current remaining value
    const handleQuantity = (value) => {
        let tempValue = value === "" ? 0 : parseInt(value);
        if (tempValue * item.price > remaining) {
            setQuantityError(true);
        } else {
            setQuantityError(false);
        }

        setQuantity(value);
    };

    // Event handler for submitting edited quantity
    const submitQuantity = () => {
        dispatch(modifyQuantity({ quantity: quantity, name: item.name }));
    };

    return (
        <tr>
            {/* Item name */}
            <td>{item.name}</td>

            {/* Quantity input */}
            <td>
                <div className="input-group">
                    <QuantityInput handleQuantity={handleQuantity} currentQuantity={quantity} />
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className={`btn-success btn ${edit ? "" : "disabled"}`}
                            onClick={submitQuantity}
                        >
                            Edit{" "}
                        </button>
                    </div>
                </div>

                {/* Simple popup for testing */}
                <div className={displayPopup(quantityError)}>
                    <p>{`${quantity} of ${item.name} is not within remaining ${remaining}`}</p>
                </div>
            </td>
            {/* Item price */}
            <td>
                {`\u00A3`} {item.price.toFixed(2)}
            </td>
            {/* Total price */}
            <td>
                {`\u00A3`} {(item.price * quantity).toFixed(2)}
            </td>
            {/* Delete button */}
            <td>
                <RemoveItem item={item} />
            </td>
        </tr>
    );
};

export default Item;
