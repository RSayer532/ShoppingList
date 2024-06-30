import React, { useState } from "react";

/** Redux */
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, selectBudget, selectEditing, selectRemaining, setEditingMode } from "../states/itemSlice";

/** Common functions/types */
import { displayPopup, ItemProps } from "./common";
import { ItemInt } from "../common";

/** Imported Components */
import { QuantityInput } from ".";
import RemoveItem from "./RemoveItem";

/** Styles */
import "./css/common.css";

/**
 * 
 * @param item item object with props price and quantity
 * @param total total spent so far
 * @param budget current budget
 * @returns
 */
const calculateMaxQuantity = (item: ItemInt, total:number, budget:number) => {
    let max;
    // If the total spent is 0, then the full budget can be used
    if (total === 0) {
        max = budget / item.price;
    } else {
        // Add the amount relating to the item to the remainder to determine total allowed
        max = (total + (item.price * item.quantity))/item.price;
    }

    return max;
}


/**
 * Item component
 */
const Item = ({ item }: ItemProps) => {
    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);
    const budget = useSelector(selectBudget);
    const globalEditing = useSelector(selectEditing);

    // Local states/variables
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [edit, setEdit] = useState<boolean>(false);
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const [total, setTotal] = useState(item.quantity * item.price);
    const [errorMessage, setErrorMessage] = useState("");

    // Check whether the input quantity is valid, given the price and current remaining value and prevent user from submitting
    const handleQuantity = (value: string) => {
        let tempValue = parseFloat(value);

        if (isNaN(tempValue)) {
            setQuantity(NaN);
            setTotal(0);
            setEdit(false);
            setQuantityError(true);
            setErrorMessage("No quantity provided");
            return;
        }

        let max = calculateMaxQuantity(item, remaining, budget);

        if (tempValue > max) {
            setQuantityError(true);
            setErrorMessage(`Only ${max} allowed`)
            setEdit(false);
        } else {
            setEdit(true);
            setQuantityError(false);
        }

        setQuantity(tempValue);
        setTotal(tempValue * item.price);

    };


    const submitQuantity = () => {
        let b;
        if (edit && !quantityError) {
            b = false;
            dispatch(modifyQuantity({ quantity: quantity, name: item.name }));
        } else {
            b = true;
        }

        dispatch(setEditingMode(b));
        setEdit(b);
    }

    return (
        <tr className="py-3">
            {/* Item name */}
            <td>{item.name}</td>

            {/* Quantity input */}
            <td>
                <div className={`input-group amount-input `}>
                    <div className={`input-div ${ edit || (edit && !globalEditing) ? "" : "disabled-input"}`}>
                        <QuantityInput handleQuantity={handleQuantity} currentQuantity={quantity} />
                    </div>
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className={`btn edit-btn ${(quantityError || (globalEditing && !edit)) ? "btn-secondary disabled" : "btn-success"}`}
                            onClick={submitQuantity}
                        >
                            {`${edit ? "Editing" : "Edit"}`}
                        </button>
                    </div>
                </div>

                {/* Simple popup for testing */}
                <div className={`${displayPopup(quantityError)} error-warning`} style={{width:'200px'} }>
                    <p>{errorMessage}</p>
                </div>
            </td>
            {/* Item price */}
            <td>
                {`\u00A3`} {item.price.toFixed(2)}
            </td>
            {/* Total price */}
            <td>
                {`\u00A3`} {total.toFixed(2)}
            </td>
            {/* Delete button */}
            <td style={{paddingRight:'0px'} }>
                <RemoveItem item={item} />
            </td>
        </tr>
    );
};

export default Item;
