import React, { useState } from "react";

/** Redux */
import { useDispatch, useSelector } from "react-redux";
import {
    modifyQuantity,
    selectBudget,
    selectEditing,
    selectRemaining,
    setEditingMode
} from "../states/itemSlice";

/** Common functions/types */
import { displayPopup, toggleState } from "./common";
import { ItemInt } from "../common";

/** Imported Components */
import { QuantityInput } from ".";
import RemoveItem from "./RemoveItem";

/** Styles */
import "./css/common.css";

// Definition of props for Item component
interface ItemProps {
    item: ItemInt;
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
    const [itemChecked, setItemChecked] = useState(false);

    /**
     * Function for calculating the maximum number of an item, given the total spent on the other items in the list
     * @param item item object with props price and quantity
     * @param total total spent so far
     * @param budget current budget
     * @returns
     */
    const calculateMaxQuantity = (item: ItemInt, total: number, budget: number) => {
        let max;
        // If the total spent is 0, then the full budget can be used
        if (total === 0) {
            max = budget / item.price;
        } else {
            // The current total spent includes the old total of the item and
            // therefore need to add this to the old remaining to find the maximum allowed
            max = (total + item.price * item.quantity) / item.price;
        }

        return max;
    };

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
            setErrorMessage(`Only ${max} allowed`);
            setEdit(false);
        } else {
            setEdit(true);
            setQuantityError(false);
        }

        setQuantity(tempValue);
        setTotal(tempValue * item.price);
    };

    // Event handler for clicking submit button, updating the items quantity and total remaining
    // if it is a valid submit. This also handles the global state of the editing mode, so that other
    // items can be edited.
    const submitQuantity = () => {
        let stillEditing;
        if (edit && !quantityError) {
            stillEditing = false;
            dispatch(modifyQuantity({ quantity: quantity, name: item.name }));
        } else {
            stillEditing = true;
        }

        dispatch(setEditingMode(stillEditing));
        setEdit(stillEditing);
    };

    // Event handler to determine checked state and cross item off of list
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        toggleState(!checked, setItemChecked);
    };

    return (
        <tr className="py-3">
            {/* Item name */}
            <td
                className={`${itemChecked ? "text-decoration-line-through" : ""}`}
                style={{ float: "none" }}
            >
                {item.name}
            </td>

            {/* Quantity input */}
            <td>
                <div className={`input-group amount-input `}>
                    <div
                        className={`input-div ${edit || (edit && !globalEditing) ? "" : "disabled-input"}`}
                    >
                        <QuantityInput handleQuantity={handleQuantity} currentQuantity={quantity} />
                    </div>
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className={`btn edit-btn ${quantityError || (globalEditing && !edit) ? "btn-secondary disabled" : "btn-success"}`}
                            onClick={submitQuantity}
                        >
                            {`${edit ? "Editing" : "Edit"}`}
                        </button>
                    </div>
                </div>

                {/* Simple popup for testing */}
                <div
                    className={`${displayPopup(quantityError)} error-warning`}
                    style={{ width: "200px" }}
                >
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
            {/* Added to basket checkbox */}
            <td>
                <div className="form-check" >
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        onChange={handleCheck}
                        style={{ float: 'none' }}
                    />
                </div>
            </td>
            {/* Delete button */}
            <td style={{ paddingRight: "0px" }}>
                <RemoveItem item={item} editing={edit} />
            </td>
        </tr>
    );
};

export default Item;
