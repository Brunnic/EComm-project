import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Product } from "../../types/Models";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <Card>
        <Link href={`/product/${product.slug}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    src={product.image}
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2">{product.price}$</Typography>
                </CardContent>
            </CardActionArea>
        </Link>
    </Card>
);

export default ProductCard;
