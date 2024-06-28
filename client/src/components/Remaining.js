import React from "react";
import { selectRemaining } from "../states/grocerySlice";
import { useSelector } from "react-redux";

const Remaining = () => {
    // Global states
    const remaining = useSelector(selectRemaining);

    return (
        <div className={`input-group mb-3`}>
            <span className="input-group-text" id="remaining">
                Remaining:
            </span>
            <span
                type="number"
                className="form-control disable"
                aria-label="Remaining"
                aria-describedby="remaining"
            >
                {remaining}
            </span>
        </div>
    );
};

export default Remaining;
