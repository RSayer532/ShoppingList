import RemoveItem from "./RemoveItem";
import { QuantityInput } from ".";

const GroceryItem = ({ grocery }) => {
    const totalPrice = grocery.quantity * grocery.price;

    return (
        <tr>
            <td>{grocery.item}</td>
            <td>
                <QuantityInput quantity={grocery.quantity} />
            </td>
            <td>{grocery.price}</td>
            <td>{totalPrice}</td>
            <td>
                <RemoveItem />
            </td>
        </tr>
    );
};

export default GroceryItem;
