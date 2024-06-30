import React from "react";

// Redux
import { selectRemaining } from "../states/itemSlice";
import { useSelector } from "react-redux";

// Common imports
import { poundSign } from "./common";

const Remaining = () => {
    // Global states
    const remaining = useSelector(selectRemaining);

    return (
        <div className={`input-group mb-3`}>
            <span className="input-group-text" id="remaining">
                Remaining ({poundSign}):
            </span>
            <span
                className="form-control disable"
                aria-label="Remaining"
                aria-describedby="remaining"
            >
                {remaining.toFixed(2)}
            </span>
        </div>
    );
};

export default Remaining;