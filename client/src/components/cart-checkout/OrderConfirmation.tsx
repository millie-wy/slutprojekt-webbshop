import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useOrder } from "../../context/OrderContextProvider";
import {
  calculateVat,
  numWithSpaces,
  sumProductPrice,
  UseSumTotal,
} from "../../Helper";
import HomeButton from "../shared/HomeButton";

const OrderConfirmation = () => {
  // const { order } = useOrder();

  return (
    <Container
      sx={{
        padding: "2rem",
        minHeight: "35rem",
      }}
    ></Container>
  );
};

export default OrderConfirmation;
