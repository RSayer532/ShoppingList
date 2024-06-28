import React from "react";
import { QuantityInput } from ".";

const AddNewItem = () => {
    const submitNewItem = () => {
        console.log("New item");
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3 department-input">
                        <span className="input-group-text input-btn" id="department-input">
                            Item
                        </span>
                        <input
                            type="text"
                            value="{name}"
                            className="form-control"
                            placeholder="..."
                            aria-label="..."
                            aria-describedby="department-input"
                            onChange="{(event) => setName(event.target.value)}"
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="allocation-input">
                                Department
                            </label>
                        </div>
                        <QuantityInput />
                    </div>
                </div>

                <div className="col">
                    <div className="input-group quantity-input">
                        <span className="input-group-text ">Price:</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Quantity"
                            aria-describedby="quantity-input"
                            value="{expenseCost}"
                            onChange="{(event) => handleAmount(event.target.value)}"
                        />
                    </div>
                </div>

                <div className="col">
                    <div className={`input-group`}>
                        <span className="input-group-text" id="price-total">
                            Total:
                        </span>
                        <span
                            type="number"
                            className="form-control disable"
                            aria-label="Total"
                            aria-describedby="price-total"
                        >
                            10
                        </span>
                    </div>
                </div>

                <div className="col col-2">
                    <button
                        type="button"
                        className="submit-btn btn btn-success"
                        onClick={submitNewItem}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewItem;
