import { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../components/layout/Navbar.component";
import { RootState } from "../redux/store";
import CartItem from "../components/Cart/CartItem.component";

const CartPage: NextPage = () => {
    const items = useSelector((state: RootState) => state.cart.items);

    const calculateTotal = () => {
        if (items && items.length > 0) {
            let total = 0;
            items.forEach((i) => {
                total += i.price * i.quantity;
            });
            return total.toPrecision(10);
        }
        return 0;
    };

    return (
        <div>
            <Head>
                <title>Cart</title>
            </Head>

            <Navbar />

            <Container>
                <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((i) => (
                                    <CartItem item={i} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                    <Typography variant="h5">
                        Total: {calculateTotal()} $
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default CartPage;
