import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContextProvider";
import {
  calculateVat,
  numWithSpaces,
  sumProductPrice,
  UseSumTotal,
} from "../../Helper";

function ShoppingCart() {
  const { cart, onAddQuantity, onReduceQuantity, removeFromCart } = useCart();

  return (
    <Container
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "Prata",
          mt: "1rem",
          mb: "1rem",
          fontSize: { xs: "18px", sm: "24px" },
        }}
        component="h5"
      >
        1. Shopping Cart
      </Typography>
      <Container
        sx={{
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          margin: "auto",
          width: { xs: 1, sm: "auto" },
        }}
      >
        {cart.map((product) => (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              p: { xs: ".8rem 0 ", sm: ".8rem 1rem" },
              position: { xs: "relative", sm: "unset" },
            }}
            key={product._id}
          >
            <Box
              component="img"
              src={`http://localhost:3001${product.imageUrl}`}
              alt={product.title}
              sx={{ width: { xs: "40px", sm: "80px", md: "80px" } }}
            />
            <Box
              key={product._id}
              sx={{
                width: 1,
                display: "flex",
                justifyContent: "space-between",
                margin: "auto",
              }}
            >
              <Box>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/detail/${product._id}`}
                >
                  <Typography
                    variant="inherit"
                    align="left"
                    m="1rem"
                    sx={{ fontSize: { xs: "12px", sm: "16px" } }}
                  >
                    {product.title}
                  </Typography>
                </Link>
                <ButtonGroup>
                  <Button
                    sx={{
                      "&:hover": {
                        color: "#828282",
                        border: "none",
                      },
                      height: "1.5rem",
                      width: ".5rem",
                      border: "none",
                      color: "black",
                      m: "auto",
                    }}
                    aria-label="reduce"
                    onClick={() => onReduceQuantity(product)}
                  >
                    <RemoveIcon
                      sx={{
                        fontSize: { xs: "12px", sm: "small" },
                      }}
                    />
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      background: "white",
                      display: "flex",
                      placeContent: "center",
                      placeItems: "center",
                      padding: { xs: "0 .3rem", sm: ".2rem .8rem" },
                      fontSize: { xs: "12px", sm: "16px" },
                    }}
                  >
                    {product.quantity}
                  </Typography>
                  <Button
                    sx={{
                      "&:hover": {
                        color: "#828282",
                        border: "none",
                      },
                      height: "1.5rem",
                      width: ".5rem",
                      border: "none",
                      color: "black",
                      m: "auto",
                    }}
                    aria-label="reduce"
                    onClick={() => onAddQuantity(product)}
                  >
                    <AddIcon sx={{ fontSize: { xs: "12px", sm: "small" } }} />
                  </Button>
                </ButtonGroup>
              </Box>
              <Typography
                variant="inherit"
                sx={{
                  display: "flex",
                  placeItems: "center",
                  fontSize: { xs: "12px", sm: "inherit" },
                }}
              >
                {numWithSpaces(sumProductPrice(product))} SEK
              </Typography>
            </Box>
            <ClearIcon
              sx={{
                "&:hover": {
                  color: "#828282",
                  border: "none",
                },
                border: "none",
                color: "black",
                cursor: "pointer",
                fontSize: { xs: "12px", sm: "small" },
                position: { xs: "absolute", sm: "unset" },
                right: { xs: "0" },
              }}
              onClick={() => removeFromCart(product)}
            >
              Delete
            </ClearIcon>
          </Box>
        ))}
        <Box
          sx={{
            borderTop: "1px solid #AAAAAA",
            width: "80%",
            margin: "1.5rem auto",
          }}
        />
        <Box sx={{ m: { xs: "1rem .5rem", sm: "1rem 2rem" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              placeItems: "center",
            }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">
              {numWithSpaces(UseSumTotal(cart, false))} SEK
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 0 0 1rem",
              placeItems: "center",
            }}
          >
            <Typography color="#6C665F" variant="overline">
              VAT
            </Typography>
            <Typography color="#6C665F" variant="overline">
              {numWithSpaces(calculateVat(cart))} SEK
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default ShoppingCart;
