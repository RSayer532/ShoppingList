export const displayPopup = (error) => (error ? "visible" : "invisible");

export const toggleDisable = (condition, setState) => {
    if (condition) {
        setState(false);
    } else {
        setState(true);
    }
};

export const poundSign = `\u00A3`;