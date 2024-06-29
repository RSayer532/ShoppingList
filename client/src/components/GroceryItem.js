import React, { useState, useEffect } from "react";
import RemoveItem from "./RemoveItem";
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, selectRemaining } from "../states/grocerySlice";
import {displayPopup, toggleDisable} from "./common";
import {QuantityInput} from ".";

const GroceryItem = ({ grocery }) => {
    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);

    // Local states/variables
    const [quantity, setQuantity] = useState(grocery.quantity);
    const [edit, setEdit] = useState(true);
    const [quantityError, setQuantityError] = useState(false);

    useEffect(() => {
        let tempTotal = parseInt(quantity) * parseFloat(grocery.price);
        // Check that at least one item is valid...??????
        let condition  = remaining <= tempTotal || quantity === "";
        toggleDisable(condition, setEdit);

    }, [remaining, quantity, grocery]);

    // Check whether the input quantity is valid, given the price and current remaining value
    const handleQuantity = (value) => {

        let tempValue = (value === "") ? 0 : parseInt(value);
        if (tempValue * grocery.price > remaining) {
            setQuantityError(true);
            
        } else {
            setQuantityError(false);
        }

        setQuantity((value));
    };

    // Event handler for submitting edited quantity
    const submitQuantity = () => {
        dispatch(modifyQuantity({ quantity: quantity, name: grocery.name }));
    }

    return (
        <tr>
            {/* Item name */}
            <td>{grocery.name}</td>

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
                    <p>{`${quantity} of ${grocery.name} is not within remaining ${remaining}`}</p>
                </div>
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
