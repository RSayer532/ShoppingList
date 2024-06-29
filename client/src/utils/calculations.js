export const calculateRemaining = (budget, itemList) => {
    let total = itemList.reduce((total, item) => total + item.price * item.quantity, 0);
    return budget - total;
};

export const calculateMaxQuantity = (oldQuantity, remaining, price) => {
    return Math.min(parseInt(oldQuantity + remaining / price), 10);
};
