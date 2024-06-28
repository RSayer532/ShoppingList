import React from "react";

const Remaining = () => {
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
                10
            </span>
        </div>
    );
};

export default Remaining;
