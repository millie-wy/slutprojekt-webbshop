import {
  Box,
  CircularProgress,
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
import { useUser } from "../../context/UserContextProvider";
import {
  calculateVat,
  numWithSpaces,
  sumProductPrice,
  UseSumTotal,
} from "../../Helper";
import HomeButton from "../shared/HomeButton";

const OrderConfirmation = () => {
  const { orderIsLoading, order } = useOrder();
  const { currentUser } = useUser();

  return orderIsLoading && !order ? (
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
        padding: "2rem",
        minHeight: "35rem",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: "0rem", sm: ".5rem", md: "1rem" },
          background: "#F3F2F0",
          textAlign: "center",
          width: { xs: 1, sm: "auto" },
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontFamily: "Prata",
            mt: "1rem",
          }}
          variant="h6"
        >
          Thank you for your purchase!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Prata",
            mt: "1rem",
            fontSize: { xs: "11px", sm: "14px", md: "18px" },
          }}
        >
          Order#: {order?._id}
        </Typography>
        <Typography
          sx={{ fontFamily: "Prata", mt: "1rem" }}
          variant="inherit"
        ></Typography>
        <Box>
          <TableContainer>
            <Table aria-label="order list">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      width: { xs: "100px", sm: "300px", md: "400px" },
                    }}
                  >
                    Article
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: 0, sm: 0, md: "1rem" },
                    }}
                    style={{ width: "50px" }}
                  >
                    Quantity
                  </TableCell>
                  {/* <TableCell
                    align="right"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: 0, sm: "1rem" },
                    }}
                  >
                    Unit Price
                  </TableCell> */}
                  <TableCell
                    align="right"
                    sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                  >
                    Subtotal (SEK)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order!.products.map((product) => (
                  <TableRow key={product.title}>
                    {/* // the above line should be id */}
                    <TableCell
                      size="small"
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                    >
                      <Box
                        component="img"
                        src={`http://localhost:3001${product.imageUrl}`}
                        alt={product.title}
                        sx={{
                          height: { xs: "40px", sm: "60px", md: "60px" },
                        }}
                      />
                      {product.title}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                    >
                      {product.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                    >
                      {numWithSpaces(sumProductPrice(product))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{
                      border: "none",
                      padding: "30px 16px 5px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={2}
                  >
                    Item Subtotal
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      padding: "30px 16px 5px 16px",
                      border: "none",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={1}
                  >
                    {numWithSpaces(
                      UseSumTotal(order!.products, false) -
                        calculateVat(order!.products)
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      border: "none",
                      padding: "4px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={2}
                  >
                    VAT 25%
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      padding: "4px 16px",
                      border: "none",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={1}
                  >
                    {numWithSpaces(calculateVat(order!.products))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    colSpan={2}
                    sx={{
                      border: "none",
                      padding: "4px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                  >
                    Delivery
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      padding: "4px 16px",
                      border: "none",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={1}
                  >
                    {numWithSpaces(order!.deliveryOption.cost)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      border: "none",
                      fontWeight: "bold",
                      padding: "4px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={2}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      padding: "4px 16px",
                      border: "none",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={1}
                  >
                    {numWithSpaces(UseSumTotal(order!.products, true))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "16px 0 8px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    Delivery Method
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "0 0 0 16px",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    {order!.deliveryOption.provider}&nbsp;(
                    {order!.deliveryOption.estTime})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "16px 0 8px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    Contact Information
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "0 0 0 16px",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    {currentUser!.fullname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "0px 16px",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    {order!.deliveryAddress.street},{" "}
                    {order!.deliveryAddress.zipCode}{" "}
                    {order!.deliveryAddress.city}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "0px 16px",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    {currentUser!.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "0px 16px",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    {order!.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      padding: "16px 0 8px 16px",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    colSpan={3}
                  >
                    Payment Method
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: "0 0 0 16px",
                    }}
                    colSpan={3}
                  >
                    {order!.paymentMethod}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <HomeButton message="Back to home" />
      </Container>
    </Container>
  );
};

export default OrderConfirmation;
