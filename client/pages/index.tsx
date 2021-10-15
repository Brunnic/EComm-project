import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";
import axios from "axios";

import Navbar from "../components/layout/Navbar.component";
import CarouselItem from "../components/layout/CarouselItem.component";

import { Category } from "../types/Models";

interface HomeProps {
    categories: Category[] | null;
}

const Home: NextPage<HomeProps> = ({ categories }) => {
    return (
        <div>
            <Head>
                <title>Shopping MA</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item sm={2} xs={12}>
                        <List
                            component="nav"
                            sx={{ width: "100%", bgcolor: "background.paper" }}
                            aria-labelledby="categories-list"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="categories-list"
                                >
                                    Categories
                                </ListSubheader>
                            }
                        >
                            {categories?.map((category) => (
                                <ListItem key={category.id}>
                                    <Link href={category.slug}>
                                        <ListItemButton component="a">
                                            <ListItemText
                                                primary={category.name}
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Carousel interval={8000}>
                            <CarouselItem />
                            <CarouselItem />
                        </Carousel>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={{ bgcolor: "background.paper", p: 2 }}>
                                <Typography variant="body1">
                                    Try out Prime
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: "background.paper", p: 2 }}>
                                <Typography variant="body1">
                                    Free shipping products
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: "background.paper", p: 2 }}>
                                <Typography variant="body1">
                                    Promotions
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await axios.get("http://localhost:8000/api/categories");
    const categories = res.data ?? null;

    return {
        props: {
            categories,
        },
    };
};

export default Home;
