import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Order } from "@server/shared/client.types";
import { Fragment, useState } from "react";
import { numWithSpaces, sumProductPrice, UseSumTotal } from "../../../Helper";

interface Props {
  order: Order;
}

function AdminordersItem(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.order.createdAt?.toString().substring(0, 10)}
        </TableCell>
        <TableCell>{props.order._id}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#F8F4EF",
          }}
          colSpan={4}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="order">
              <TableHead>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell style={{ color: "#6C665F" }}>Customer</TableCell>
                  <TableCell align="left" style={{ color: "#6C665F" }}>
                    Total Amount
                  </TableCell>
                  <TableCell align="left" style={{ color: "#6C665F" }}>
                    Shipped
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell>{props.order.customer?.fullname}</TableCell>
                  <TableCell align="left">
                    {numWithSpaces(UseSumTotal(props.order.products, true))}
                  </TableCell>
                  <TableCell align="left">
                    {props.order.isShipped ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              </TableBody>

              <TableHead>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell
                    align="left"
                    colSpan={2}
                    style={{ color: "#6C665F" }}
                  >
                    Delivery Address
                  </TableCell>
                  <TableCell align="left" style={{ color: "#6C665F" }}>
                    Shipper
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell align="left" colSpan={2}>
                    {props.order.deliveryAddress.street},{" "}
                    {props.order.deliveryAddress.zipCode},{" "}
                    {props.order.deliveryAddress.city}
                  </TableCell>
                  <TableCell align="left">
                    {props.order.deliveryOption.provider}
                  </TableCell>
                </TableRow>
              </TableBody>

              <TableHead>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell align="left" sx={{ color: "#6C665F" }}>
                    Product
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6C665F" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6C665F" }}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.order.products.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{
                      "& > *": { borderBottom: "unset", fontSize: "12px" },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        placeItems: "center",
                        gap: "1rem",
                        fontSize: "12px",
                        border: "none",
                      }}
                    >
                      <img
                        src={`http://localhost:3001${product.imageUrl}`}
                        alt={product.title}
                        style={{ maxHeight: "50px" }}
                      />
                      {product.title}
                    </TableCell>
                    <TableCell align="left">{product.quantity}</TableCell>
                    <TableCell align="left">
                      {numWithSpaces(sumProductPrice(product))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
export default AdminordersItem;
