import React from "react";

/* eslint no-unused-vars: "off"*/
/* eslint react/prop-types: "off"*/

const Budget = () => {
    // Event handler to determine if the input is valid and set the budget
    const handleNewBudget = (budgetString) => {
        console.log("Setting new budget");
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
                    value=""
                    aria-label="Budget"
                    aria-describedby="budget-input"
                    onChange={(event) => handleNewBudget(event.target.value)}
                />
            </div>
        </>
    );
};

export default Budget;
