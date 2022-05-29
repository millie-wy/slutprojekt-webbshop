import { Box, CircularProgress, Container, Typography } from "@mui/material";
import type { Product } from "@server/shared/client.types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../context/OrderContextProvider";
import { useProduct } from "../context/ProductContext";
import { numWithSpaces } from "../Helper";

const StartPage = () => {
  const { products, fetchAllProducts, isLoading } = useProduct();
  const { setOrder } = useOrder();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts();
    setOrder(undefined); // empty "order" state when the user leaves the confirmation
  }, []);

  useEffect(() => {
    getRandomProduct();
  }, [products]);

  const getRandomProduct = () => {
    let randoms: Product[] = [];
    const numOfRandomProducts: number = 6;
    if (products.length > numOfRandomProducts) {
      while (randoms.length < numOfRandomProducts) {
        let random = products[Math.floor(Math.random() * products.length)];
        if (randoms.indexOf(random) === -1) {
          randoms.push(random);
        }
      }
      setRandomProducts(randoms);
    }
  };

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
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {randomProducts.map((product) => (
        <Box
          key={product.title}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            sx={{
              width: {
                xs: 1,
                md: `calc(100vw/2)`,
                lg: `calc(100vw/3)`,
              },
            }}
            alt={product.title}
            src={`http://localhost:3001${product.imageUrl}`}
          />
          <Box
            component={Link}
            {...{
              to: `/detail/${product._id}`,
            }}
            style={{
              position: "absolute",
              top: Math.floor(Math.random() * (400 - 50) + 50),
              left: Math.floor(Math.random() * (300 - 50) + 50),
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h5"
              color="white"
              fontFamily="Prata"
              style={{
                textShadow: "#3c3c3c 1px 0 20px",
              }}
            >
              {product.title} <br />
            </Typography>
            <Typography
              variant="subtitle2"
              color="white"
              fontFamily="Prata"
              style={{ textShadow: "#3c3c3c 1px 0 20px" }}
            >
              {numWithSpaces(product.price)} SEK
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StartPage;
