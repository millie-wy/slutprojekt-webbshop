import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "@server/shared/client.types";
import detailInfo from "../assets/images/detailinfo.png";
import { makeRequest, numWithSpaces } from "../Helper";
import AddToCartButton from "./shared/AddToCartButton";

function DetailPage() {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await makeRequest(`/api/product/${params.id}`, "GET");
      setProduct(response);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);

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
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "4rem",
        marginBottom: "4rem",
      }}
      sx={{
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
      }}
    >
      <Container
        component="img"
        height="300"
        style={{
          height: "650px",
          maxWidth: "500px",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
        src={`http://localhost:3001${product!.imageUrl}`}
      ></Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
        }}
        sx={{
          marginLeft: { md: 0, lg: "2rem" },
          marginTop: { sm: 0, md: "4rem", lg: "4rem" },
        }}
      >
        <Typography variant="h3" gutterBottom style={{ fontSize: "2rem" }}>
          {product!.title}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontSize: "13px",
            marginTop: "1rem",
            marginBottom: "2rem",
            maxWidth: "400px",
            color: "#545454",
          }}
        >
          {product!.description}
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontSize: "1.4rem",
          }}
        >
          {numWithSpaces(product!.price)} SEK
        </Typography>
        <AddToCartButton
          product={product!}
          size="large"
          style={{
            margin: "2rem",
            maxWidth: "360px",
            backgroundColor: "#CAC2B9",
            letterSpacing: "3px",
          }}
        />
        <img src={detailInfo} alt="product details" width="350px" />
      </Container>
    </Container>
  );
}

export default DetailPage;
