import React from "react";
import { removeItem, setEditingMode } from "../states/itemSlice";
import { useDispatch } from "react-redux";

/** Styles */
import "./css/common.css";
import { ItemInt } from "../common";

// Definition of props type for RemoveItem component
interface RemoveProps {
    item: ItemInt;
    editing: boolean;
}

/**
 * Button component to remove item from the list
 */
const RemoveItem = ({ item, editing }: RemoveProps) => {
    // Global state
    const dispatch = useDispatch();

    // Event handler for clicking on delete button
    const handleClick = () => {
        dispatch(removeItem(item));
        if (editing) {
            dispatch(setEditingMode(false));
        }
    };

    return (
        <button type="button" className="btn-danger btn action-btn" onClick={handleClick}>
            Delete
        </button>
    );
};

export default RemoveItem;
