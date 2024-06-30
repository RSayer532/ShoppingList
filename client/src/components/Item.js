import React, { useState } from "react";
import RemoveItem from "./RemoveItem";
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, selectRemaining } from "../states/itemSlice";
import { displayPopup, toggleDisable, poundSign } from "./common";
import { QuantityInput } from ".";

const Item = ({ item }) => {
    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);

    // Local states/variables
    const [quantity, setQuantity] = useState(item.quantity);
    const [edit, setEdit] = useState(true);
    const [quantityError, setQuantityError] = useState(false);
 
    // Check whether the input quantity is valid, given the price and current remaining value and prevent user from submitting
    const handleQuantity = (value) => {
        let tempValue = value === "" ? 0 : parseInt(value);
        let tempTotal = parseInt(tempValue) * parseFloat(item.price);

        if (tempTotal > remaining) {
            setQuantityError(true);
            setEdit(false);
        } else {
            toggleDisable((value===""), setEdit);
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
                    <p>{`${quantity} of ${item.name} is not within remaining ${poundSign}${remaining}`}</p>
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
