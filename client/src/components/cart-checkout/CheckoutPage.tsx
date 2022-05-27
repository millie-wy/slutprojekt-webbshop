import { Container } from "@mui/material";
import { useCart } from "../../context/CartContextProvider";
import EmptyCart from "../EmptyCart";
import LoginForm from "../LoginForm";
import CheckoutFormContainer from "./CheckoutFormContainer";
import ShoppingCart from "./ShoppingCart";

function CheckoutPage() {
  const { cart } = useCart();


  return cart.length < 1 ? (
    <EmptyCart />
  ) : (
    <Container> 
      <LoginForm />
      <ShoppingCart />
      <CheckoutFormContainer />
    </Container>
  );
}

export default CheckoutPage;
