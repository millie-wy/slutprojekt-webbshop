import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
  Container,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isContext } from "vm";
import { ProductContext } from "../context/ProductContext";
import { makeRequest, numWithSpaces } from "../Helper";
import { Product } from "../Types";
import AddToCartButton from "./shared/AddToCartButton";

interface Props {
  props: Product;
}

function ProductCard(props) {
  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.fetchProducts(props);
    console.log("productCard");
  }, []);

  return productContext.isLoading ? (
    <Container sx={{ height: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "3rem 10rem",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "6rem",
      }}
    >
      {productContext.filteredList.map((product) => (
        <Card sx={cardStyle} key={product.id}>
          <Link to={`/detail/${product.id}`} style={linkStyle}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                style={imgStyle}
                src={product.image}
                title={product.title}
                id={product.id}
              ></CardMedia>
            </CardActionArea>
            <Typography
              style={{ marginTop: "1rem" }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.title}
            </Typography>
          </Link>
          <Box
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {numWithSpaces(product.price)} SEK
            </Typography>
            <CardActions>
              <AddToCartButton product={product} size="small" />
            </CardActions>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

const cardStyle: SxProps<Theme> = {
  width: 250,
  padding: "1rem",
  boxShadow: "none",
};

const imgStyle: CSSProperties = {
  height: 350,
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#333",
};

export default ProductCard;
function fetchData() {
  throw new Error("Function not implemented.");
}
