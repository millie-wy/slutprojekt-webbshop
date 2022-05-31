import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import valid from "card-validator";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useCart } from "../../context/CartContextProvider";
import { useOrder } from "../../context/OrderContextProvider";
import ErrorSnackBar from "../shared/ErrorSnackBar";
import CustomerDetails from "./CustomerDetails";
import DeliveryOptions from "./DeliveryOptions";
import PaymentMethod from "./PaymentMethod";
import PriceOverview from "./PriceOverview";
export interface FormValues {
  phoneNumber: number | "";
  deliveryAddress: {
    street: string | "";
    zipCode: number | "";
    city: string | "";
  };
  creditCard: {
    cardNumber: number | "";
    cardExpiry: number | "";
    cardCVC: number | "";
  };
  swish: number | "";
  invoice: number | "";
}

function CheckoutFormContainer() {
  const { isSwish, isCreditCard, isInvoice } = useCart();
  const { processOrder, orderIsLoading, setOrderIsLoading } = useOrder();

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const personalIdentityRegExp =
    /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/;

  const InitialValue: FormValues = {
    deliveryAddress: {
      street: "",
      zipCode: "",
      city: "",
    },
    phoneNumber: "",
    creditCard: {
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
    swish: "",
    invoice: "",
  };

  const ValidationSchema = yup.object().shape({
    deliveryAddress: yup.object().shape({
      street: yup.string().min(3).required("Required"),
      zipCode: yup.string().min(5).max(6).required("Required"),
      city: yup.string().required("Required"),
    }),
    phoneNumber: yup
      .string()
      .required("Required")
      .matches(phoneRegExp, "Invalid phone number"),

    creditCard: yup.object().shape({
      cardNumber: yup.lazy(() =>
        isCreditCard
          ? yup
              .string()
              .required("Required")
              .test(
                "test-number",
                "Invalid card number",
                (value) => valid.number(value).isValid
              )
          : yup.string()
      ),
      cardExpiry: yup.lazy(() =>
        isCreditCard
          ? yup
              .string()
              .required("Required")
              .max(4, "Invalid length")
              .test(
                "test-number",
                "Invalid",
                (value) => valid.expirationDate(value).isValid
              )
          : yup.string()
      ),
      cardCVC: yup.lazy(() =>
        isCreditCard
          ? yup
              .string()
              .required("Required")
              .max(4, "Invalid length")
              .test(
                "test-number",
                "Invalid",
                (value) => valid.cvv(value).isValid
              )
          : yup.string()
      ),
    }),

    swish: yup.lazy(() =>
      isSwish
        ? yup
            .string()
            .matches(phoneRegExp, "Invalid phone number")
            .required("Required")
        : yup.string()
    ),

    invoice: yup.lazy(() =>
      isInvoice
        ? yup
            .string()
            .required("Required")
            .matches(personalIdentityRegExp, "Invalid personal identity number")
        : yup.string()
    ),
  });

  return (
    <Formik
      initialValues={InitialValue}
      validationSchema={ValidationSchema}
      onSubmit={(values: FormValues) => {
        setOrderIsLoading(true);
        setTimeout(() => {
          processOrder(values);
        }, 2000);
      }}
    >
      <Form>
        <DeliveryOptions />
        <CustomerDetails />
        <PaymentMethod />
        <PriceOverview />
        <Box style={{ textAlign: "center" }}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={orderIsLoading}
            disabled={orderIsLoading}
            loadingIndicator="Confirming..."
            style={{
              textAlign: "center",
              margin: "2rem",
              letterSpacing: "3px",
              backgroundColor: "#CAC2B9",
            }}
            sx={{
              width: {
                xs: "200px",
                sm: "400px",
                md: "400px",
                lg: "400px",
              },
            }}
            type="submit"
          >
            Confirm purchase
          </LoadingButton>
          <ErrorSnackBar />
        </Box>
      </Form>
    </Formik>
  );
}

export default CheckoutFormContainer;
