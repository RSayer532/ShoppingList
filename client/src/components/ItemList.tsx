import React from "react";
import { useSelector } from "react-redux";
import { Item } from ".";

import { selectAllItems } from "../states/itemSlice";

/**
 * Item list component
 */
const ItemList = () => {

    const items = useSelector(selectAllItems);

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
                {items.map((item) => (
                    <Item item={item} key={item.name} />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;
