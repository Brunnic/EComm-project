import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { ItemData } from "../../redux/reducers/cart";
import { editCart, removeFromCart } from "../../redux/actions/cart";

interface CartItemProps {
    item: ItemData;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const [editedItem, setEditedItem] = useState({
        id: 0,
        quantity: 0,
    });
    const dispatch = useDispatch();

    return (
        <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
                <TextField
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={
                        editedItem.quantity
                            ? editedItem.quantity
                            : item.quantity
                    }
                    onChange={(e) =>
                        setEditedItem({
                            id: item.id,
                            quantity: parseInt(e.target.value),
                        })
                    }
                />
            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
                <Button
                    onClick={() => {
                        dispatch(editCart(editedItem.id, editedItem.quantity));
                    }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {
                        dispatch(removeFromCart(item.id));
                    }}
                >
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CartItem;
