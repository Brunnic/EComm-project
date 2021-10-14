import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";

import Navbar from "../../components/layout/Navbar.component";

import { Product } from "../../types/Models";

interface ResponseData {
    data: Product[];
    current_page: number;
}

const ProductPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Product Title</title>
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item sm={9} xs={12}>
                        <Box sx={{ bgcolor: "background.paper", p: 2 }}></Box>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        Side bar options
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await axios.get(
        `http://localhost:8000/api/products/${params?.slug}`
    );
    const product = res.data;

    return {
        props: {
            product,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get<ResponseData>(
        "http://localhost:8000/api/products"
    );
    const products = res.data.data;

    const paths = products.map((product: Product) => ({
        params: { slug: product.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default ProductPage;
