import React, { useState, useEffect } from "react";
import { QuantityInput } from ".";
import { useDispatch, useSelector } from "react-redux";
import { selectRemaining, addGrocery, selectExistingItems } from "../states/grocerySlice";

/**
 * Component for adding a new grocery item to the list
 */
const AddNewItem = () => {
    // Component states
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState(1);
    const [total, setTotal] = useState("0.00");
    const [disableBtn, setDisableBtn] = useState("");
    const [budgetError, setBudgetError] = useState(false);

    // Global states
    const dispatch = useDispatch();
    const remainingBudget = useSelector(selectRemaining);
    const currentGroceries = useSelector(selectExistingItems);

    useEffect(() => {
        // If no item or price is given, or the total is too large then disable submit button
        if (itemName === "" || itemPrice === "" || budgetError) {
            setDisableBtn("disabled");
        } else {
            setDisableBtn("");
        }
    }, [itemName, itemPrice, budgetError]);

    const displayPopup = (error) => (error ? "visible" : "invisible");

    // Event handler for item submission to grocery list
    const submitNewItem = () => {
        const newItem = {
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: parseInt(itemQuantity)
        };

        dispatch(addGrocery(newItem));

        // Clear inputs
        setItemPrice("");
        setTotal("");
    };

    // Event handler for item name input
    const handleName = (inputName) => {
        //Check if already have item in the list;
        if (currentGroceries.includes(inputName)) {
            console.log("Already item in the list. Please add to its quantity");
        } else {
            setItemName(inputName);
        }
    };

    // Event handler for item price input
    const handlePrice = (priceValue) => {
        // Break out of function if no price value to prevent NaN error if input empty
        // Number type of HTML element ensures that only digits input
        if (priceValue === "") {
            setItemPrice("");
            setTotal("");
            return;
        }

        let calculatedTotal = parseFloat(priceValue) * itemQuantity;

        // Determine if within budget and trigger popup
        if (calculatedTotal > remainingBudget) {
            setBudgetError(true);
        } else {
            setBudgetError(false);
        }

        // Still allow the user to see their input
        setItemPrice(priceValue);
        setTotal(String(calculatedTotal));
    };

    const handleQuantity = (quantityValue) => {
        // Determine if within budget and trigger alert
        if (quantityValue * itemPrice > remainingBudget) {
            setBudgetError(true);
        } else {
            setBudgetError(false);
        }
        // Ensure that the total does not
        //is this a number?
        setItemQuantity(quantityValue);
        setTotal(quantityValue * itemPrice);
    };

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

                {/* Dropdown to choose quantity of item type */}
                <div className="col">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Quantity</label>
                        </div>
                        <QuantityInput setQuantity={handleQuantity} defaultQuantity={1} />
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
                        className={`btn ${disableBtn} btn-success`}
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
        </div>
    );
};

export default AddNewItem;
