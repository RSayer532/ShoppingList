import React, { useState } from "react";

/** Redux */
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, selectRemaining } from "../states/itemSlice";

/** Common functions/types */
import { displayPopup, toggleState, poundSign, ItemProps } from "./common";

/** Imported Components */
import { QuantityInput } from ".";
import RemoveItem from "./RemoveItem";

const Item = ({ item }: ItemProps) => {
    // Global states
    const dispatch = useDispatch();
    const remaining: number = useSelector(selectRemaining);

    // Local states/variables
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [edit, setEdit] = useState<boolean>(true);
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const [total, setTotal] = useState(item.quantity * item.price);

    // Check whether the input quantity is valid, given the price and current remaining value and prevent user from submitting
    const handleQuantity = (value: string) => {
        let tempValue = parseFloat(value);

        if (isNaN(tempValue)) {
            setQuantity(NaN);
            setTotal(0);
            setEdit(false);
            return;
        }

        let tempTotal = tempValue * item.price;

        if (tempTotal > remaining) {
            setQuantityError(true);
            setEdit(false);
        } else {
            toggleState(isNaN(tempValue), setEdit);
            setQuantityError(false);
        }

        setQuantity(tempValue);
        setTotal(tempTotal);
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
                {`\u00A3`} {total.toFixed(2)}
            </td>
            {/* Delete button */}
            <td>
                <RemoveItem item={item} />
            </td>
        </tr>
    );
};

export default Item;
