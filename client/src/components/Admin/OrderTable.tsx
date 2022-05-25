import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useAdminOrder } from "../../context/AdminOrderContext";

function BasicTable() {

 const { fetchAllOrders, orders } = useAdminOrder();
 console.log(orders);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders])

  

  return (
    <TableContainer style={{ marginBottom: "3rem" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#CAC2B9" }}>
            <TableCell style={{ fontWeight: "bold", color: "white" }}>
              User
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Product amount
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Price paid
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Shipping
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Order date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{order.customer.fullname}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{order.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
