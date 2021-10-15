import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

import Navbar from "../components/layout/Navbar.component";

import { Category, Product } from "../types/Models";

interface ResponseData {
    data: Product[];
}

interface CategoryPageProps {
    products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products }) => {
    return (
        <div>
            <Head>
                <title>Category Name</title>
            </Head>

            <Navbar />

            <Container>
                <Box sx={{ mt: 2, bgcolor: "background.paper" }}>
                    Promotions
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item sm={3} xs={12}>
                        Sidebar Showing Categories
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                mt: 2,
                                bgcolor: "background.paper",
                                pb: 2,
                                pr: 2,
                            }}
                        >
                            {products.map((p) => (
                                <Grid item sm={3} xs={6} key={p.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            src={p.image}
                                            alt={p.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body1">
                                                {p.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {p.price}$
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await axios.get<ResponseData>(
        `http://localhost:8000/api/categories/${params?.category}`
    );

    const products = res.data.data;

    return {
        props: {
            products,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get<Category[]>(
        "http://localhost:8000/api/categories"
    );

    const categories: Category[] = res.data;

    const paths = categories.map((category) => ({
        params: { category: category.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default CategoryPage;
