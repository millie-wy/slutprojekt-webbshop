import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import creditCardLogo from "../../../assets/images/creditCardLogo.png";
import { FormValues } from "../CheckoutFormContainer";

const PaymentCreditCard = () => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        mt: { xs: 0, sm: "2rem" },
        mb: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: 1, sm: "80%", md: "70%" },
      }}
    >
      <Box
        sx={{
          my: ".5rem",
          display: "flex",
          justifyContent: "center",
          width: 1,
          alignItems: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
          },
        }}
      >
        <img
          src={creditCardLogo}
          alt="creditCard"
          height="20px"
          width="50px"
          style={{
            marginTop: "1.5rem",
            marginRight: "1rem",
          }}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            width: 1,
            height: "40px",
            mb: "1.5rem",
            mt: {
              xs: "1rem",
            },
            maxWidth: "400px",
          }}
          id="creditCard.cardNumber"
          name="creditCard.cardNumber"
          label="Card Number"
          type="text"
          size="small"
          value={values.creditCard.cardNumber}
          onChange={handleChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          error={
            touched.creditCard?.cardNumber &&
            Boolean(errors.creditCard?.cardNumber)
          }
          helperText={errors.creditCard?.cardNumber}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: {
            xs: "left",
            sm: "center",
            md: "center",
            lg: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
          },
          columnGap: "1rem",
        }}
      >
        <TextField
          style={{
            backgroundColor: "white",
            width: "20%",
            minWidth: "80px",
            height: "40px",
          }}
          sx={{
            ml: {
              xs: "0rem",
              sm: "2rem",
              md: "2rem",
              lg: "2rem",
            },
            mb: "1rem",
          }}
          id="creditCard.cardExpiry"
          name="creditCard.cardExpiry"
          label="MMYY"
          type="text"
          size="small"
          value={values.creditCard.cardExpiry}
          onChange={handleChange}
          error={
            touched.creditCard?.cardExpiry &&
            Boolean(errors.creditCard?.cardExpiry)
          }
          helperText={errors.creditCard?.cardExpiry}
        />
        <TextField
          style={{
            backgroundColor: "white",
            width: "20%",
            minWidth: "80px",
            height: "40px",
          }}
          sx={{
            mt: {
              xs: "1rem",
              sm: "0rem",
              md: "0rem",
              lg: "0rem",
            },
            mb: "1rem",
          }}
          id="creditCard.cardCVC"
          name="creditCard.cardCVC"
          label="CVC"
          type="text"
          size="small"
          value={values.creditCard.cardCVC}
          onChange={handleChange}
          error={
            touched.creditCard?.cardCVC && Boolean(errors.creditCard?.cardCVC)
          }
          helperText={errors.creditCard?.cardCVC}
        />
      </Box>
    </Box>
  );
};

export default PaymentCreditCard;
