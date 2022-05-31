import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import { useAdminProduct } from "../../../context/AdminProductContextProvider";
import { useProduct } from "../../../context/ProductContextProvider";
import AddProductFormModal from "./AddProductFormModal";
import AdminProductsItem from "./AdminProductsItem";

function AdminProductsTable() {
  const { isLoading, products, fetchAllProducts } = useProduct();
  const { setImageId } = useAdminProduct();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [products])

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

      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{
            display: "flex",
            width: "fit-content",
            backgroundColor: "#CAC2B9",
            textTransform: "none",
          }}
          onClick={() => setIsOpen(true)}
        >
          ADD
          <AddIcon />
        </Button>
        <AddProductFormModal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setImageId("");
          }}
        />
      </Box>

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
            {[...products].sort((a, b) => (a._id! < b._id! ? 1 : -1)).map((product) => {
              return <AdminProductsItem key={product._id} product={product} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminProductsTable;
