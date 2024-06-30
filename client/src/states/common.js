export const calculateRemaining = (budget, itemList) => {
    let total = itemList.reduce((total, item) => total + item.price * item.quantity, 0);
    return budget - total;
};

export const calculateTotalSpent = (itemList) => {
    return itemList.reduce((total, item) => total + item.price * item.quantity, 0);
}