import { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

import Navbar from "../components/layout/Navbar.component";
import { RootState } from "../redux/store";

const CartPage: NextPage = () => {
    const items = useSelector((state: RootState) => state.cart.items);

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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    items.map((i) => (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.id}</TableCell>
                                            <TableCell>{i.name}</TableCell>
                                            <TableCell>{i.quantity}</TableCell>
                                            <TableCell>{i.price}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>
    );
};

export default CartPage;
