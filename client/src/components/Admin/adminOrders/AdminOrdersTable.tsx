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
import { useEffect } from "react";
import { useAdminOrder } from "../../../context/AdminOrderContextProvider";
import { useUser } from "../../../context/UserContextProvider";
import ErrorSnackBar from "../../shared/ErrorSnackBar";
import NoPermission from "../../shared/NoPermission";
import AdminOrdersItem from "./AdminOrdersItem";

function AdminOrderTable() {
  const { currentUser } = useUser();
  const { fetchAllOrders, orders, isLoading } = useAdminOrder();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  if (currentUser?.isAdmin) {
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
          Admin {">"} Orders
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
              {orders
                .sort((a, b) => (a.updatedAt! < b.updatedAt! ? 1 : -1))
                .map((order) => {
                  return <AdminOrdersItem key={order._id} order={order} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <ErrorSnackBar />
      </Container>
    );
  } else {
    return (
      <NoPermission
        page="No Permisson"
        description="This page is only for Administrators."
      />
    );
  }
}

export default AdminOrderTable;
