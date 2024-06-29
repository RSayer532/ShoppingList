import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRemaining, addGrocery, selectExistingItems } from "../states/grocerySlice";
import {displayPopup, toggleDisable} from "./common";
import {QuantityInput} from ".";

/**
 * Component for adding a new item to the list
 */
const AddNewItem = () => {
    // Component states
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [total, setTotal] = useState("0.00");
    const [submit, setSubmit] = useState(false);
    const [budgetError, setBudgetError] = useState(false);
    const [nameError, setNameError] = useState(false);

    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);
    const itemList = useSelector(selectExistingItems);

    // clear inputs of each element
    const clearInputs = () => {
        setItemPrice("");
        setTotal("");
        setItemName("");
        setItemQuantity(1);
    };

    useEffect(() => {
        // If no item or price is given, or the total is too large then disable submit button
        let condition = itemName === "" || itemPrice === "" || budgetError;
        toggleDisable(condition, setSubmit);
    }, [itemName, itemPrice, budgetError]);

    // Event handler for item submission to current list
    const submitNewItem = () => {
        const newItem = {
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: parseInt(itemQuantity)
        };

        dispatch(addGrocery(newItem));

        // Clear inputs
        clearInputs();
    };

    // Event handler for item name input
    const handleName = (inputName) => {
        //Check if already have item in the list;
        if (itemList.includes(inputName)) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        setItemName(inputName);
    };

    const handleValue = (value, total, setMethod) => {
        // Break out of function if no price value to prevent NaN error if input empty
        // Number type of HTML element ensures that only digits input
        if (value === "") {
            setMethod("");
            setTotal("");
            return;
        }

        // Determine if within budget and trigger popup
        if (total > remaining) {
            setBudgetError(true);
        } else {
            setBudgetError(false);
        }

        // Still allow the user to see their input
        setMethod(value);
        setTotal(String(total));
    };

    // Event handler for item price input
    const handlePrice = (priceValue) =>
        handleValue(priceValue, priceValue * itemQuantity, setItemPrice);
    
        const handleQuantity = (quantityValue) =>
        handleValue(quantityValue, itemPrice * quantityValue, setItemQuantity);

    return (
        <div>
            <div className="row">
                {/* Input for grocery item */}
                <div className="col">
                    <div className="input-group mb-3 department-input">
                        <span className="input-group-text input-btn" id="item-input">
                            Item
                        </span>
                        <input
                            type="text"
                            value={itemName}
                            className="form-control"
                            placeholder="..."
                            aria-label="..."
                            aria-describedby="item-input"
                            onChange={(event) => handleName(event.target.value)}
                        />
                    </div>
                </div>

                {/* Input for price of single item */}
                <div className="col">
                    <div className="input-group ">
                        <span className="input-group-text price-input ">Price ({`\u00A3`}):</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Price"
                            value={itemPrice}
                            placeholder="0.00"
                            aria-describedby="price-input"
                            onChange={(event) => handlePrice(event.target.value)}
                        />
                    </div>
                </div>

                {/* Input for quantity*/}
                <div className="col">
                    <div className="input-group ">
                        <span className="input-group-text price-input ">Quantity:</span>
                        <QuantityInput handleQuantity={handleQuantity} currentQuantity={itemQuantity} />
                    </div>
                </div>

                {/* Total cost of number of items input */}
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text" id="price-total">
                            Total ({`\u00A3`}):
                        </span>
                        <span
                            type="number"
                            className="form-control"
                            aria-label="Total"
                            placeholder="0.00"
                            value={total}
                            aria-describedby="price-total"
                        >
                            {total}
                        </span>
                    </div>
                </div>

                {/* Submit button */}
                <div className="col col-2">
                    <button
                        type="button"
                        className={`btn ${submit ? "" : "disabled"} btn-success`}
                        onClick={submitNewItem}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Simple popup for testing */}
            <div className={displayPopup(budgetError)}>
                <p>The total price is greater than the remaning amount</p>
            </div>

            {/* Simple popup for testing */}
            <div className={displayPopup(nameError)}>
                <p>This item is already in the list, add to quantity</p>
            </div>
        </div>
    );
};

export default AddNewItem;
