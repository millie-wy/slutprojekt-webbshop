import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useProduct } from "../../../context/ProductContext";
import AdminProductsItem from "./AdminProductsItem";

function AdminProductsTable() {
  const { products } = useProduct();

  return (
    <TableContainer component={Paper} sx={{ my: "1.5rem" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#CAC2B9" }}>
            <TableCell />
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                Title
              </Typography>
            </TableCell>
            {/* <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                ID
              </Typography>
            </TableCell> */}
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                Category
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
                Price
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1" fontWeight="bold" color="white">
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
  );
}

export default AdminProductsTable;
