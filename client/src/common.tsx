/** Common types/interfaces used in src */
export interface ItemsState {
    budget: number;
    remaining: number;
    items: ItemInt[];
    inEditingMode: boolean;
}

export interface ItemInt {
    name: string;
    price: number;
    quantity: number;
}

export const calculateTotalSpent = (itemList: ItemInt[]) => {
    return itemList.reduce((total, item) => total + item.price * item.quantity, 0);
};
