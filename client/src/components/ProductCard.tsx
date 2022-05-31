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
import { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContextProvider";
import { numWithSpaces } from "../Helper";
import AddToCartButton from "./shared/AddToCartButton";
import ErrorSnackBar from "./shared/ErrorSnackBar";
import OutOfStockButton from "./shared/OutOfStockButton";

function ProductCard() {
  const { fetchAllProducts, isLoading, filteredProducts } = useProduct();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return isLoading ? (
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
      {filteredProducts.map((product) => (
        <Card sx={cardStyle} key={product._id}>
          <Link to={`/detail/${product._id}`} style={linkStyle}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                style={imgStyle}
                src={`http://localhost:3001${product!.imageUrl}`}
                title={product.title}
                id={product._id}
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
              {!product!.stock ? (
                <OutOfStockButton size="small" />
              ) : (
                <AddToCartButton product={product} size="small" />
              )}
            </CardActions>
          </Box>
        </Card>
      ))}
      <ErrorSnackBar />
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
