import React from "react";
import { removeItem } from "../states/itemSlice";
import { useDispatch } from "react-redux";
import { ItemProps } from "./common";

/**
 * Button component to remove item from the list
 */
const RemoveItem = ({ item }: ItemProps) => {
    // Global state
    const dispatch = useDispatch();

    // Event handler for clicking on delete button
    const handleClick = () => {
        dispatch(removeItem(item));
    };

    return (
        <button type="button" className="btn-danger btn" onClick={handleClick}>
            Delete
        </button>
    );
};

export default RemoveItem;
