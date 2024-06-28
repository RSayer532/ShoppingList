import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { GroceryList, Budget, Remaining, TotalSpent, AddNewItem } from "./components";

import { Provider } from "react-redux";
import { store } from "./states/store";

const App = () => {
    return (
        <Provider store={store}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h1 className="mt-3">My Groceries</h1>
                </div>
            </nav>
            <div className="container">
                <div className="row mt-4">
                    {
                        <div className="col">
                            <Budget />
                        </div>
                    }

                    {
                        <div className="col">
                            <Remaining />
                        </div>
                    }

                    {
                        <div className="col">
                            <TotalSpent />
                        </div>
                    }
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col">
                        <GroceryList />
                    </div>
                </div>
                <div className="row mt-3">
                    <h2 className="mt-3">Add an item</h2>
                    {<AddNewItem />}
                </div>
            </div>
        </Provider>
    );
};

export default App;
