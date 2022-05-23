import { Box, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductCategoryList from "./ProductCategoryList";

function ProductPage() {
  return (
    <Box>
      <Container>
        <Typography
          sx={{
            pt: "1rem",
            textTransform: "uppercase",
            fontFamily: "Prata",
            mt: "1rem",
          }}
          variant="h5"
        >
          Furniture
        </Typography>
        <ProductCategoryList />
      </Container>
      <ProductCard />
    </Box>
  );
}

export default ProductPage;
