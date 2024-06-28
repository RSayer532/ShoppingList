import React from "react";

/**
 * Component displaying the total amount spent on the current items in the list
 */
const TotalSpent = () => {
    return (
        <div className={`input-group mb-3`}>
            <span className="input-group-text input-btn" id="total-spent">
                Total:
            </span>
            <span
                type="number"
                className="form-control disable"
                aria-label="Total"
                aria-describedby="total-spent"
            ></span>
        </div>
    );
};

export default TotalSpent;
