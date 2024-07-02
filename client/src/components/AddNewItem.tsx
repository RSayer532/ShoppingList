import React, { useState, useEffect } from "react";

/**Redux */
import { useDispatch, useSelector } from "react-redux";
import { selectRemaining, addItem, selectExistingItems } from "../states/itemSlice";

/** Functions */
import { displayPopup, toggleState, checkNaN } from "./common";

/** Imported components */
import { QuantityInput } from ".";

/** Styles */
import "./css/common.css";

/** Variable types that are of type number */
enum Value {
    Price,
    Quantity
}

/**
 * Component for adding a new item to the list, including input for name, price, quantity, a total value and submit button
 */
const AddNewItem = () => {
    // Component states
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(NaN);
    const [itemQuantity, setItemQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [budgetError, setBudgetError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [priceError, setPriceError] = useState(false);

    // Global states
    const dispatch = useDispatch();
    const remaining = useSelector(selectRemaining);
    const itemList = useSelector(selectExistingItems);

    // Clear inputs of each element
    const clearInputs = () => {
        setItemPrice(NaN);
        setTotal(0);
        setItemName("");
        setItemQuantity(1);
    };

    // TODO: do i need use effect??????
    useEffect(() => {
        // If no item or price is given, or the total is too large then disable submit button
        let condition = itemName === "" || isNaN(itemPrice) || isNaN(itemQuantity) || budgetError;
        toggleState(condition, setSubmit);
    }, [itemName, itemPrice, budgetError, itemQuantity]);

    // Event handler for item submission to current list
    const submitNewItem = () => {
        const newItem = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        };

        dispatch(addItem(newItem));

        // Clear inputs
        clearInputs();
    };

    // Event handler for item name input
    const handleName = (inputName: string) => {
        //Check if already have item in the list and warn user;
        if (itemList.includes(inputName)) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        setItemName(inputName);
    };

    /**
     * An abstract handler function for handling inputs of type Value
     * Checks are made to determine if the input type is valid and sets the appropriate states/errors
     * @param value Input value from HTML element
     * @param errorSetter setState action for the required error state
     * @param stateSetter setState action for the required state
     */
    const handleValue = (
        value: string,
        valueType: Value,
        errorSetter: Function,
        stateSetter: Function
    ) => {
        let tempValue = parseFloat(value);

        // Check if the input is empty
        if (isNaN(tempValue)) {
            setTotal(0);
            stateSetter(NaN);
            errorSetter(true);
            return;
        }

        // Get the value of the other quantity (price or quantity) for calculating the total price of items
        let otherValue = valueType === Value.Price ? itemQuantity : itemPrice;

        // Check before calculating total that the other value, either price/quantity is not 0 as well
        if (isNaN(otherValue)) {
            setTotal(0);
        } else {
            setTotal(otherValue * tempValue);
        }

        // Check if the the new total is within the remaining amount and update state of budget error
        let inBudget = tempValue * otherValue < remaining;
        toggleState(inBudget, setBudgetError);

        stateSetter(tempValue);
        errorSetter(false);
    };

    // Specific implementations of above function for handling the price input
    const handlePrice = (value: string) =>
        handleValue(value, Value.Price, setPriceError, setItemPrice);

    // Specific implementations of above function for handling the quantity input
    const handleQuantity = (value: string) =>
        handleValue(value, Value.Quantity, setQuantityError, setItemQuantity);

    return (
        <div>
            <div className="row justify-content-center">
                {/* Input for item */}
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

                    {/* Simple popup for name error */}
                    <div className={`${displayPopup(nameError)} error-warning`}>
                        <p>Item in list</p>
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
                            value={checkNaN(itemPrice)}
                            placeholder="0.00"
                            aria-describedby="price-input"
                            onChange={(event) => handlePrice(event.target.value)}
                        />
                    </div>
                    {/* Simple popup for price error */}
                    <div className={`${displayPopup(priceError)} error-warning`}>
                        <p>No price given</p>
                    </div>
                </div>

                {/* Input for quantity */}
                <div className="col">
                    <div className="input-group ">
                        <span className="input-group-text price-input ">Quantity:</span>
                        <QuantityInput
                            handleQuantity={handleQuantity}
                            currentQuantity={itemQuantity}
                        />
                    </div>

                    {/* Simple popup for quantity error */}
                    <div className={`${displayPopup(quantityError)} error-warning`}>
                        <p>Quantity empty</p>
                    </div>
                </div>

                {/* Total cost of number of items input */}
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text" id="price-total">
                            Total ({`\u00A3`}):
                        </span>
                        <span
                            className="form-control"
                            aria-label="Total"
                            aria-describedby="price-total"
                        >
                            {total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Submit button */}
                <div className="col col-2">
                    <button
                        type="button"
                        className={`btn ${submit ? "" : "disabled"} btn-success action-btn`}
                        onClick={submitNewItem}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Simple popup for testing */}
            <div className={`${displayPopup(budgetError)} error-warning`}>
                <p>The total price is greater than the remaning amount</p>
            </div>
        </div>
    );
};

export default AddNewItem;
