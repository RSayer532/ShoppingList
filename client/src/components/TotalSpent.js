import React from "react";
import {useSelector} from 'react-redux';
import {selectExistingTotal} from '../states/itemSlice';
import {poundSign} from "./common";

/**
 * Component displaying the total amount spent on the current items in the list
 */
const TotalSpent = () => {

    const totalSpent = useSelector(selectExistingTotal);

    return (
        <div className={`input-group mb-3`}>
            <span className="input-group-text input-btn" id="total-spent">
                Total ({poundSign}):
            </span>
            <span
                type="number"
                className="form-control disable"
                aria-label="Total"                
                aria-describedby="total-spent"
            >{totalSpent.toFixed(2)}</span>
        </div>
    );
};

export default TotalSpent;
