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

import axios from "../util/axios";

import Navbar from "../components/layout/Navbar.component";
import CarouselItem from "../components/layout/CarouselItem.component";
import Footer from "../components/layout/Footer.component";

import { Category, Product } from "../types/Models";
import ProductCard from "../components/Product/ProductCard.component";

interface HomeProps {
    categories: Category[] | null;
    lowest: Product[] | null;
}

const Home: NextPage<HomeProps> = ({ categories, lowest }) => {
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
                    <Grid item md={2} xs={12}>
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
                                <ListItem key={category.id} sx={{ p: 0 }}>
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
                    <Grid item md={8} xs={12}>
                        <Carousel interval={8000}>
                            <CarouselItem />
                            <CarouselItem />
                        </Carousel>
                    </Grid>
                    <Grid item md={2} xs={12}>
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
                    <Grid
                        item
                        xs={12}
                        sx={{
                            width: "90%",
                            bgcolor: "background.paper",
                            mt: 4,
                        }}
                    >
                        <Typography variant="h5">Promos</Typography>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                pr: 2,
                            }}
                        >
                            {lowest
                                ? lowest.map((p) => (
                                      <Grid key={p.id} item sm={3} xs={6}>
                                          <ProductCard product={p} />
                                      </Grid>
                                  ))
                                : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await axios.get("api/categories");
    const categories = res.data ?? null;
    const res2 = await axios.get("api/product/lowest");

    return {
        props: {
            categories,
            lowest: res2.data ?? null,
        },
    };
};

export default Home;
