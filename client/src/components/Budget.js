import React, { useState } from "react";
import { setBudget, selectBudget, selectExistingTotal } from "../states/itemSlice";
import { useSelector, useDispatch } from "react-redux";

const Budget = () => {
    // Global states
    const budget = useSelector(selectBudget);
    const currentTotal = useSelector(selectExistingTotal);
    const dispatch = useDispatch();

    // Component states
    const [newBudget, setNewBudget] = useState(budget);
    const [budgetError, setBudgetError] = useState(false);

    const displayPopup = (error) => (error ? "visible" : "invisible");

    // Event handler to determine if the input is valid and set the budget
    const handleNewBudget = (budgetString) => {
        setNewBudget(budgetString);

        // will this cause problems in state mismatch???
        let newBudgetFloat = parseFloat(budgetString);
        if (!isNaN(newBudgetFloat)) {
            // Budget cannot be less than total of items in the current list
            if (currentTotal > newBudgetFloat) {
                setBudgetError(true);
            } else {
                setBudgetError(false);
            }

            // Dispatch budget, even if incorrect, to update the remaining realistically
            dispatch(setBudget(newBudgetFloat));
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text input-btn" id="budget-input">
                    Budget ({`\u00A3`}):
                </span>
                <input
                    type="number"
                    step="10"
                    className="form-control"
                    value={newBudget}
                    aria-label="Budget"
                    aria-describedby="budget-input"
                    onChange={(event) => handleNewBudget(event.target.value)}
                />
            </div>
            <div className={displayPopup(budgetError)}>
                <p>The budget cannot be less than the total already on the list</p>
            </div>
        </>
    );
};

export default Budget;
