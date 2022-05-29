import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContextProvider";
import AdminProductsItem from "./AdminProductsItem";

function AdminProductsTable() {
  const { isLoading, products, fetchAllProducts } = useProduct();

  useEffect(() => {
    fetchAllProducts();
  }, [products]);

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
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", my: "1rem" }}
        variant="h5"
      >
        Admin {">"} Products
      </Typography>
      <TableContainer component={Paper} sx={{ my: "1.5rem" }}>
        <Table aria-label="admin-products">
          <TableHead>
            <TableRow style={{ backgroundColor: "#CAC2B9" }}>
              <TableCell />
              <TableCell align="left">
                <Typography variant="body2" fontWeight="bold" color="white">
                  Title
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight="bold" color="white">
                  Category
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight="bold" color="white">
                  Stock
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              return <AdminProductsItem key={product._id} product={product} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminProductsTable;
