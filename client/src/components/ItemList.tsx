import React from "react";
import { useSelector } from "react-redux";
import { Item } from ".";

import { selectAllItems } from "../states/itemSlice";
import { ItemInt } from "../common";

/**
 * Item list component, a table of all items in the global array
 */
const ItemList = () => {
    const items = useSelector(selectAllItems);

    return (
        <table className="table text-center">
            <thead className="thead">
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price per item</th>
                    <th scope="col">Total</th>
                    <th scope="col">In basket</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item:ItemInt) => (
                    <Item item={item} />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;
