import { Circle } from "@mui/icons-material/";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import detailInfo from "../assets/images/detailinfo.png";
import { useProduct } from "../context/ProductContextProvider";
import { numWithSpaces } from "../Helper";
import AddToCartButton from "./shared/AddToCartButton";
import ErrorSnackBar from "./shared/ErrorSnackBar";
import OutOfStockButton from "./shared/OutOfStockButton";

function DetailPage() {
  const params = useParams<{ id: string }>();
  const { fetchProduct, isLoading, product } = useProduct();

  useEffect(() => {
    fetchProduct(params.id!);
  }, [fetchProduct, params.id]);

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
        {!product!.stock ? (
          <OutOfStockButton
            size="large"
            style={{
              margin: "2rem 2rem 0.5rem 2rem",
              maxWidth: "360px",
              backgroundColor: "#CAC2B9",
              letterSpacing: "3px",
            }}
          />
        ) : (
          <AddToCartButton
            product={product!}
            size="large"
            style={{
              margin: "2rem 2rem 0.5rem 2rem",
              maxWidth: "360px",
              backgroundColor: "#CAC2B9",
              letterSpacing: "3px",
            }}
          />
        )}
        {!product!.stock ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              gap: ".3rem",
              placeContent: "center",
              mb: "2rem",
            }}
          >
            <Circle style={{ fontSize: "10px", color: "red" }} />
            <Typography fontSize="11px" color="#545454">
              Out of stock
            </Typography>
          </Box>
        ) : product!.stock < 5 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              gap: ".3rem",
              placeContent: "center",
              mb: "2rem",
            }}
          >
            <Circle style={{ fontSize: "10px", color: "orange" }} />
            <Typography fontSize="11px" color="#545454">
              Only{" "}
              <span style={{ color: "orange", fontWeight: "600" }}>
                {product!.stock} left{" "}
              </span>
              in stock
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              gap: ".3rem",
              placeContent: "center",
              mb: "2rem",
            }}
          >
            <Circle style={{ fontSize: "9px", color: "green" }} />
            <Typography fontSize="11px" color="#545454">
              In stock
            </Typography>
          </Box>
        )}
        <img src={detailInfo} alt="product details" width="350px" />
      </Container>
      <ErrorSnackBar />
    </Container>
  );
}

export default DetailPage;
