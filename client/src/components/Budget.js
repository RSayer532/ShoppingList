import React, { useState } from "react";
import { setBudget, selectBudget, selectExistingTotal } from "../states/grocerySlice";
import { useSelector, useDispatch } from "react-redux";

const Budget = () => {
    // Global states
    const budget = useSelector(selectBudget);
    const currentTotal = useSelector(selectExistingTotal);
    const dispatch = useDispatch();

    // Component states
    const [newBudget, setNewBudget] = useState(budget);

    // Event handler to determine if the input is valid and set the budget
    const handleNewBudget = (budgetString) => {
        setNewBudget(budgetString);

        // will this cause problems in state mismatch???
        let newBudgetFloat = parseFloat(budgetString);
        if (!isNaN(newBudgetFloat)) {
            // Cannot modify the budget when the total of existing items is more than new budget
            if (currentTotal > newBudgetFloat) {
                console.log("Cannot set budget to this value, items already surpass");
            } else {
                dispatch(setBudget(newBudgetFloat));
            }
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text input-btn" id="budget-input">
                    Budget:
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
        </>
    );
};

export default Budget;
