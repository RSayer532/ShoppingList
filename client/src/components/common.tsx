/** Common values */
export const poundSign = `\u00A3`;

/** Common functions */
// Return class name to hide element if error is true
export const displayPopup = (error: boolean) => (error ? "visible" : "invisible");

// toggle state depending on input condition
export const toggleState = (condition: boolean, setState: Function) => {
    if (condition) {
        setState(false);
    } else {
        setState(true);
    }
};

// Return empty string if number is NaN
export const checkNaN = (value: number) => (isNaN(value) ? "" : String(value));
