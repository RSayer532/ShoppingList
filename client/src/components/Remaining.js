import React from "react";
import { selectRemaining } from "../states/grocerySlice";
import { useSelector } from "react-redux";

const Remaining = () => {
    // Global states
    const remaining = useSelector(selectRemaining);

    // Local variable
    const highlight = (remaining >= 0) ? "" : "bg-warning";

    return (
        <div className={`input-group mb-3`}>
            <span className="input-group-text" id="remaining">
                Remaining ({`\u00A3`}):
            </span>
            <span
                type="number"
                className={`form-control disable ${highlight}`}
                aria-label="Remaining"
                aria-describedby="remaining"
            >
                {remaining.toFixed(2)}
            </span>
        </div>
    );
};

export default Remaining;
