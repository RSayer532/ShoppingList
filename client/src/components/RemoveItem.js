import React from "react";

/**
 * Button component to remove item from the list
 */
const RemoveItem = (props) => {
    const handleClick = () => {
        console.log("Remove Item");
    };

    return (
        <button type="button" className="btn-danger btn" onClick={handleClick}>
            Delete
        </button>
    );
};

export default RemoveItem;
