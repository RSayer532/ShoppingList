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
