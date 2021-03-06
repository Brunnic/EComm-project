import * as React from "react";
import Image, { ImageLoaderProps } from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const imgLoader = ({ src, width }: ImageLoaderProps) => {
    return `https://via.placeholder.com/${width}${src}/09f/fff`;
};

const CarouselItem: React.FC = () => (
    <Paper sx={{ p: 2 }}>
        <Image loader={imgLoader} src=".png" width={800} height={400} />
        <Typography variant="h2">New Products</Typography>
    </Paper>
);

export default CarouselItem;
