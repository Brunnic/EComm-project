import { useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import axios from "axios";

import Navbar from "../components/layout/Navbar.component";
import Footer from "../components/layout/Footer.component";
import ProductCard from "../components/Product/ProductCard.component";

import { Category, Product } from "../types/Models";

interface ResponseData {
    data: Product[];
}

interface CategoryPageProps {
    products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products }) => {
    const [priceFilter, setPriceFilter] = useState("");

    const filterPrice = (filter: string) => {
        if (filter === "ascending") {
            return [...products].sort((first, second) => {
                if (first.price > second.price) {
                    return 1;
                } else if (first.price < second.price) {
                    return -1;
                }
                return 0;
            });
        } else if (filter === "descending") {
            return [...products].sort((first, second) => {
                if (first.price < second.price) {
                    return 1;
                } else if (first.price > second.price) {
                    return -1;
                }
                return 0;
            });
        }
        return products;
    };

    return (
        <div>
            <Head>
                <title>Category Name</title>
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item sm={3} xs={12}>
                        <Box sx={{ p: 2, mt: 2, bgcolor: "background.paper" }}>
                            <Typography variant="h6">Filters</Typography>
                            <Box>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Price
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="price"
                                        defaultValue="ascending"
                                        name="radio-buttons-group"
                                        value={priceFilter}
                                        onChange={(e) => {
                                            setPriceFilter(e.target.value);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="ascending"
                                            control={<Radio />}
                                            label="Ascending"
                                        />
                                        <FormControlLabel
                                            value="descending"
                                            control={<Radio />}
                                            label="Descending"
                                        />
                                        <FormControlLabel
                                            value="none"
                                            control={<Radio />}
                                            label="None"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
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
                            {filterPrice(priceFilter).map((p) => (
                                <Grid item sm={3} xs={6} key={p.id}>
                                    <ProductCard product={p} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
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
