import React, { useState, useEffect } from "react";

/**Redux */
import { useDispatch, useSelector } from "react-redux";
import { selectRemaining, addItem, selectExistingItems } from "../states/itemSlice";

/** Functions */
import { displayPopup, toggleState, checkNaN } from "./common";

/** Imported components */
import { QuantityInput } from ".";

/**
 * Component for adding a new item to the list
 */
const AddNewItem = () => {
    // Component states
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
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
        setItemPrice(0);
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
        //Check if already have item in the list;
        if (itemList.includes(inputName)) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        setItemName(inputName);
    };

    // Handler function for input types
    /**
     * 
     * @param value Input value from HTML element
     * @param errorSetter setState action for the required error state
     * @param stateSetter setState action for the required state
     */
    const handleValue = (value: string, errorSetter: Function, stateSetter: Function) => {
        let tempValue = parseFloat(value);

        // Check if the input is empty
        if (isNaN(tempValue)) {
            setTotal(0);
            stateSetter(NaN);
            errorSetter(true);
            return;
        }

        // Check if the total of the items is more than the remaining budget
        let total = tempValue * itemQuantity;
        if (total > remaining) {
            setBudgetError(true);
        } else {
            setBudgetError(false);
        }

        stateSetter(tempValue);
        setTotal(total);
        errorSetter(false);
    };

    const handlePrice = (value: string) => handleValue(value, setPriceError, setItemPrice);
    const handleQuantity = (value: string) => handleValue(value, setQuantityError, setItemQuantity);

    return (
        <div>
            <div className="row">
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
                </div>

                {/* Input for quantity*/}
                <div className="col">
                    <div className="input-group ">
                        <span className="input-group-text price-input ">Quantity:</span>
                        <QuantityInput
                            handleQuantity={handleQuantity}
                            currentQuantity={itemQuantity}
                        />
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

            {/* Simple popup for testing */}
            <div className={displayPopup(quantityError)}>
                <p>Must have at least one</p>
            </div>

            {/* Simple popup for testing */}
            <div className={displayPopup(priceError)}>
                <p>Must enter a price</p>
            </div>
        </div>
    );
};

export default AddNewItem;
