import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

import Navbar from "../../components/layout/Navbar.component";

import { Product } from "../../types/Models";

interface ResponseData {
    data: Product[];
    current_page: number;
}

interface ProductPageProps {
    product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
    return (
        <div>
            <Head>
                <title>{product.name}</title>
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item sm={9} xs={12}>
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 2,
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: "100%" }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 2,
                                }}
                            >
                                <Typography variant="h3">
                                    {product.name}
                                </Typography>
                                <Typography variant="h6">
                                    {product.price}$
                                </Typography>
                                <Button variant="contained" sx={{ mt: 2 }}>
                                    Add to cart
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ bgcolor: "background.paper", p: 2, mt: 4 }}>
                            <Typography variant="h3">Description</Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                            <Typography variant="h6">
                                Delivery options
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Illum eum optio eos soluta et
                                ad laborum atque officiis odio. Enim.
                            </Typography>
                        </Box>
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
