import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Item } from ".";

import { selectAllItems } from "../states/itemSlice";

/**
 * Item list component
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
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <Item item={item} />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;
