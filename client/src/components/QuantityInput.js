import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRemaining } from "../states/grocerySlice";
import { calculateMaxQuantity } from "../utils/calculations";

const QuantityInput = ({ setQuantity, currentQuantity, price }) => {
    // Global states
    const remaining = useSelector(selectRemaining);

    // Local states
    const [dropdownList, setDropdownList] = useState(Array(10));

    // create into user effect
    useEffect(() => {
        // Calculate the maximum quantity allowed

        // Need temp for new item but not for other....
        let tempRemaining = remaining - currentQuantity * price;
        let c = remaining > tempRemaining ? tempRemaining : remaining;
        let maxValid = calculateMaxQuantity(currentQuantity, c, price);

        // If the maximum calculated is less than the current, create array from 1...current so user can only reduce items
        let maximum = maxValid >= 1 ? maxValid : currentQuantity;

        // should you call setstate in use effect?
        setDropdownList(
            Array(maximum)
                .fill()
                .map((_, index) => index + 1)
        );
    }, [currentQuantity, remaining, price]);

    return (
        <select
            className="custom-select"
            id="allocation-input"
            onChange={(event) => setQuantity(event.target.value)}
        >
            <option defaultValue>{currentQuantity}</option>
            {dropdownList.map((quantity) => (
                <option value={quantity} key={quantity}>
                    {quantity}
                </option>
            ))}
        </select>
    );
};

export default QuantityInput;
