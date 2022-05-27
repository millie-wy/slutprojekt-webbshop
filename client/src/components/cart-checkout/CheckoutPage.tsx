import { Container } from "@mui/material";
import { useCart } from "../../context/CartContextProvider";
import { useUser } from "../../context/UserContextProvider";
import EmptyCart from "../EmptyCart";
import LoginForm from "../LoginForm";
import CheckoutFormContainer from "./CheckoutFormContainer";
import ShoppingCart from "./ShoppingCart";

function CheckoutPage() {
  const { cart } = useCart();
  const { currentUser } = useUser();

  return cart.length < 1 ? (
    <EmptyCart />
  ) : (
    <Container>
      <ShoppingCart />
      {!currentUser ? <LoginForm /> :
      <CheckoutFormContainer />}
    </Container>
  );
}

export default CheckoutPage;
