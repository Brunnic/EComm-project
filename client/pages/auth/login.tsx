import { ChangeEvent, useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth";
import Navbar from "../../components/layout/Navbar.component";
import Footer from "../../components/layout/Footer.component";
import { RootState } from "../../redux/store";

const LoginPage: NextPage = () => {
    const { replace, push } = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            replace("/");
        }
    }, [user]);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <Navbar />

            <Container sx={{ mt: 10 }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
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
                                Login
                            </Typography>
                            <TextField
                                required
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                value={loginData.email}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                required
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                sx={{ mt: 2 }}
                                value={loginData.password}
                                onChange={(e) => handleChange(e)}
                            />

                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => {
                                    dispatch(
                                        login(loginData, () => {
                                            replace("/");
                                        })
                                    );
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} xs={12}>
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
                                Register
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={(e) => push("/auth/register")}
                            >
                                Register
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default LoginPage;
