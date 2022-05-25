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
          id="cardNumber"
          name="cardNumber"
          label="Card Number"
          type="text"
          size="small"
          value={values.cardNumber}
          onChange={handleChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          error={touched.cardNumber && Boolean(errors.cardNumber)}
          helperText={errors.cardNumber}
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
          id="cardExpiry"
          name="cardExpiry"
          label="MMYY"
          type="text"
          size="small"
          value={values.cardExpiry}
          onChange={handleChange}
          error={touched.cardExpiry && Boolean(errors.cardExpiry)}
          helperText={errors.cardExpiry}
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
          id="cardCVC"
          name="cardCVC"
          label="CVC"
          type="text"
          size="small"
          value={values.cardCVC}
          onChange={handleChange}
          error={touched.cardCVC && Boolean(errors.cardCVC)}
          helperText={errors.cardCVC}
        />
      </Box>
    </Box>
  );
};

export default PaymentCreditCard;
