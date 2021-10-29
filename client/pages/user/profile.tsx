import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Navbar from "../../components/layout/Navbar.component";
import { RootState } from "../../redux/store";
import Footer from "../../components/layout/Footer.component";

const ProfilePage: NextPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { replace } = useRouter();

    if (
        (!user || Object.keys(user).length < 1) &&
        typeof window !== "undefined"
    )
        replace("/auth/login");

    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>

            <Navbar />

            <Container>
                <Box
                    sx={{
                        mt: 2,
                        bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pb: 24,
                    }}
                >
                    <Avatar sx={{ width: 140, height: 140, mt: 2 }}>
                        {user.fName}
                    </Avatar>
                    <Typography variant="h6">
                        {user.fName} {user.lName}
                    </Typography>
                    <Typography variant="body1">{user.email}</Typography>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default ProfilePage;
