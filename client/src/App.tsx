import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { ItemList, Budget, Remaining, TotalSpent, AddNewItem } from "./components";

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
            <div className="container" style={{ width: "90%", margin: "auto" }}>
                <div className="row mt-3">
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
                <div className="row mb-3 justify-content-center">
                    <div className="col">
                        <ItemList />
                    </div>
                </div>
                <div className="row">
                    <h2 className="mb-3">Add an item</h2>
                    {<AddNewItem />}
                </div>
            </div>
        </Provider>
    );
};

export default App;
