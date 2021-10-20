import { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { register } from "../../redux/actions/auth";
import Navbar from "../../components/layout/Navbar.component";

const RegisterPage: NextPage = () => {
    const { push, replace } = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>

            <Navbar />

            <Container sx={{ mt: 10 }}>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ mb: 2, textAlign: "center" }}
                    >
                        Make an account
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            mb: 2,
                            gap: 1,
                        }}
                    >
                        <TextField
                            required
                            type="text"
                            id="fName"
                            name="fName"
                            label="First Name"
                            sx={{
                                width: "100%",
                            }}
                            value={formData.fName}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            required
                            type="text"
                            id="lName"
                            name="lName"
                            label="Last Name"
                            sx={{
                                width: "100%",
                            }}
                            value={formData.lName}
                            onChange={(e) => handleChange(e)}
                        />
                    </Box>
                    <TextField
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        sx={{ mt: 2 }}
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                    />

                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                            dispatch(
                                register(formData, () => {
                                    replace("/auth/login");
                                })
                            );
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default RegisterPage;
