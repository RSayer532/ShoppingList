import React, { useState } from "react";

// Redux
import { setBudget, selectBudget, selectExistingTotal } from "../states/itemSlice";
import { useSelector, useDispatch } from "react-redux";

// Common functions
import { poundSign, displayPopup, checkNaN } from "./common";

/** Styles */
import "./css/common.css";

const Budget = () => {
    // Global states
    const budget: number = useSelector(selectBudget);
    const currentTotal: number = useSelector(selectExistingTotal);
    const dispatch = useDispatch();

    // Component states
    const [newBudget, setNewBudget] = useState<number>(budget);
    const [budgetError, setBudgetError] = useState<boolean>(false);

    // Event handler to determine if the input is valid and set the budget
    const handleNewBudget = (value: string) => {
        let tempValue = parseFloat(value);

        // Check if the input is empty
        if (isNaN(tempValue)) {
            setNewBudget(NaN);
            setBudgetError(true);
            return;
        }

        // Check if the current total of items is more than the input budget value
        if (currentTotal > tempValue) {
            setBudgetError(true);
        } else {
            setBudgetError(false);
        }

        setNewBudget(tempValue);
        dispatch(setBudget(tempValue));
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text input-btn" id="budget-input">
                    Budget ({poundSign}):
                </span>
                <input
                    type="number"
                    step="10"
                    className="form-control"
                    value={checkNaN(newBudget)}
                    aria-label="Budget"
                    aria-describedby="budget-input"
                    onChange={(event) => handleNewBudget(event.target.value)}
                />
            </div>
            <div className={`${displayPopup(budgetError)} error-warning`}>
                <p>Budget lower than current total</p>
            </div>
        </>
    );
};

export default Budget;
