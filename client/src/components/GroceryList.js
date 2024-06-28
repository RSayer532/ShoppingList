import React from "react";
import RemoveItem from "./RemoveItem";
import { QuantityInput } from ".";

/**
 * Grocery list component
 */
const GroceryList = () => {
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
                <tr>
                    <td>Bananas</td>
                    <td>
                        <QuantityInput />
                    </td>
                    <td>0.99</td>
                    <td>1.98</td>
                    <td>
                        <RemoveItem />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GroceryList;
