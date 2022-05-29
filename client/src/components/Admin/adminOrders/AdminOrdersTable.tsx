import {
  Box,
  CircularProgress,
  Container,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import * as React from "react";
import { useEffect } from "react";
import { useAdminOrder } from "../../../context/AdminOrderContextProvider";
import AdminOrdersItem from "./AdminOrdersItem";

function AdminOrderTable() {
  const { fetchAllOrders, orders, isLoading } = useAdminOrder();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

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
        Admin
      </Typography>
      <TableContainer style={{ marginBottom: "3rem" }} component={Paper}>
        <Table aria-label="admin-order">
          <TableHead style={{ background: "#CAC2B9" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Order Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Order #
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return <AdminOrdersItem key={order._id} order={order} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminOrderTable;

{
  /* <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Customer
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Products
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Amount (Incl. shipping)
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Delivery Option
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Shipped
              </TableCell> */
}
