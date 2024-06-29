import React from "react";
import { removeGrocery } from "../states/grocerySlice";
import { useDispatch } from "react-redux";

/**
 * Button component to remove item from the list
 */
const RemoveItem = ({ grocery }) => {
    // Global state
    const dispatch = useDispatch();

    // Event handler for clicking on delete button
    const handleClick = () => {
        dispatch(removeGrocery(grocery));
    };

    return (
        <button type="button" className="btn-danger btn" onClick={handleClick}>
            Delete
        </button>
    );
};

export default RemoveItem;
