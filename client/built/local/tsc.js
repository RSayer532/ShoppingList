System.register("index", ["react", "react-dom/client", "./App"], function (exports_1, context_1) {
    "use strict";
    var React, ReactDOM, App_1, rootElement, root;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            rootElement = document.getElementById("root");
            root = ReactDOM.createRoot(rootElement);
            root.render(
                <React.StrictMode>
                    <App_1.default />
                </React.StrictMode>
            );
        }
    };
});
System.register("common", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {}
    };
});
System.register(
    "states/itemSlice",
    ["@reduxjs/toolkit", "./common"],
    function (exports_3, context_3) {
        "use strict";
        var _a,
            toolkit_1,
            common_1,
            initialState,
            itemSlice,
            addItem,
            setBudget,
            removeItem,
            modifyQuantity,
            selectAllItems,
            selectBudget,
            selectRemaining,
            selectSpendingLimit,
            selectExistingItems,
            selectExistingTotal;
        var __moduleName = context_3 && context_3.id;
        return {
            setters: [
                function (toolkit_1_1) {
                    toolkit_1 = toolkit_1_1;
                },
                function (common_1_1) {
                    common_1 = common_1_1;
                }
            ],
            execute: function () {
                // For testing purposes
                initialState = {
                    budget: 100,
                    remaining: 100 - (0.5 * 2 + 1 * 5),
                    items: [
                        {
                            name: "Banana",
                            price: 0.5,
                            quantity: 2
                        },
                        {
                            name: "Apples",
                            price: 1.0,
                            quantity: 5
                        }
                    ]
                };
                itemSlice = toolkit_1.createSlice({
                    name: "groceries",
                    initialState: initialState,
                    reducers: {
                        addItem: function (state, action) {
                            // Add item to array
                            state.items.push(action.payload);
                            // Modify the remaining budget
                            state.remaining = common_1.calculateRemaining(
                                state.budget,
                                state.items
                            );
                        },
                        removeItem: function (state, action) {
                            // Find item in array and remove
                            var itemIndex = state.items.findIndex(function (item) {
                                return item.name === action.payload.name;
                            });
                            state.items.splice(itemIndex, 1);
                            // Add the total cost of the number of items back to remaining
                            var total = action.payload.price * action.payload.quantity;
                            state.remaining += total;
                        },
                        modifyQuantity: function (state, action) {
                            // Get values from action
                            var quantity = action.payload.quantity;
                            var name = action.payload.name;
                            // Update the item in the array
                            var itemIndex = state.items.findIndex(function (item) {
                                return item.name === name;
                            });
                            state.items[itemIndex].quantity = quantity;
                            // update the remaining value
                            state.remaining = common_1.calculateRemaining(
                                state.budget,
                                state.items
                            );
                        },
                        setBudget: function (state, action) {
                            // Set budget value
                            state.budget = action.payload;
                            // Recalculate the remaining value
                            state.remaining = common_1.calculateRemaining(
                                state.budget,
                                state.items
                            );
                        }
                    }
                });
                exports_3("addItem", (addItem = ((_a = itemSlice.actions), _a.addItem))),
                    exports_3("setBudget", (setBudget = _a.setBudget)),
                    exports_3("removeItem", (removeItem = _a.removeItem)),
                    exports_3("modifyQuantity", (modifyQuantity = _a.modifyQuantity));
                exports_3("default", itemSlice.reducer);
                exports_3(
                    "selectAllItems",
                    (selectAllItems = function (state) {
                        return state.groceries.items;
                    })
                );
                exports_3(
                    "selectBudget",
                    (selectBudget = function (state) {
                        return state.groceries.budget;
                    })
                );
                exports_3(
                    "selectRemaining",
                    (selectRemaining = function (state) {
                        return state.groceries.remaining;
                    })
                );
                exports_3(
                    "selectSpendingLimit",
                    (selectSpendingLimit = function (state) {
                        return state.groceries.spendingLimit;
                    })
                );
                exports_3(
                    "selectExistingItems",
                    (selectExistingItems = toolkit_1.createSelector(
                        [selectAllItems],
                        function (items) {
                            return items.map(function (item) {
                                return item.name;
                            });
                        }
                    ))
                );
                exports_3(
                    "selectExistingTotal",
                    (selectExistingTotal = toolkit_1.createSelector(
                        [selectAllItems],
                        common_1.calculateTotalSpent
                    ))
                );
            }
        };
    }
);
//# sourceMappingURL=tsc.js.map
