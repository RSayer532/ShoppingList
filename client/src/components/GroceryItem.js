import RemoveItem from "./RemoveItem";
import { QuantityInput } from ".";

const GroceryItem = ({ grocery }) => {
    const totalPrice = grocery.quantity * grocery.price;

    return (
        <tr>
            <td>{grocery.name}</td>
            <td>
                <QuantityInput quantity={grocery.quantity} />
            </td>
            <td>
                {`\u00A3`} {grocery.price.toFixed(2)}
            </td>
            <td>
                {`\u00A3`} {totalPrice.toFixed(2)}
            </td>
            <td>
                <RemoveItem />
            </td>
        </tr>
    );
};

export default GroceryItem;
