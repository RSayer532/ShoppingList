import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GroceryItem } from ".";

import { selectAllGroceries } from "../states/grocerySlice";

/**
 * Grocery list component
 */
const GroceryList = () => {
    const groceries = useSelector(selectAllGroceries);

    return (
        <table className="table" style={{ width: "90%", margin: "auto" }}>
            <thead className="thead">
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price per item</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {groceries.map((grocery) => (
                    <GroceryItem grocery={grocery} key={grocery.name} />
                ))}
            </tbody>
        </table>
    );
};

export default GroceryList;
