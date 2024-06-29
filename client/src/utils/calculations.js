export const calculateRemaining = (budget, itemList) => {
    let total = itemList.reduce((total, item) => total + item.price * item.quantity, 0);
    return budget - total;
};

export const calculateMaxQuantity = (oldQuantity, remaining, price) => {
    let q = parseInt(oldQuantity);
    console.log(q);
    console.log(remaining);
    return Math.min(parseInt(q + remaining / price), 10);
};
