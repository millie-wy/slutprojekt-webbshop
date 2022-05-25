import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import invoiceLogo from "../../../assets/images/invoiceLogo.png";
import { FormValues } from "../../cart-checkout/CheckoutFormContainer";

const PaymentInvoice = () => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        my: { xs: "1rem", sm: "2rem" },
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: 1, sm: "80%", md: "70%" },
        maxWidth: "400px",
      }}
    >
      <img
        src={invoiceLogo}
        alt="invoice"
        width="40px"
        style={{ margin: "1rem auto" }}
      />
      <TextField
        sx={{
          backgroundColor: "white",
          width: 1,
          height: "40px",
        }}
        id="invoice"
        name="invoice"
        label="Personal Identity Number"
        type="text"
        size="small"
        placeholder="YYYYMMDD-XXXX"
        value={values.invoice}
        onChange={handleChange}
        error={touched.invoice && Boolean(errors.invoice)}
        helperText={errors.invoice}
      />
    </Box>
  );
};

export default PaymentInvoice;
