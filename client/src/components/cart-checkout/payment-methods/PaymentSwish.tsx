import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import SwishLogo from "../../../assets/images/SwishLogo.svg";
import { FormValues } from "../../cart-checkout/CheckoutFormContainer";

const PaymentSwish = () => {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext<FormValues>();
  const [swishNumber, setSwishNumber] = useState(values.phoneNumber);

  useEffect(() => {
    setSwishNumber(swishNumber);
    setFieldValue("swish", swishNumber);
  }, [setFieldValue, swishNumber]);

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        my: { xs: "1rem", sm: "2rem" },
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: 1, sm: "80%", md: "70%" },
      }}
    >
      <img
        src={SwishLogo}
        alt="Swish"
        height="20px"
        style={{ margin: "1rem auto" }}
      />
      <TextField
        sx={{
          margin: "auto",
          backgroundColor: "white",
          width: 1,
          height: "40px",
          maxWidth: "400px",
        }}
        id="swish"
        name="swish"
        label="Phone Number"
        type="text"
        size="small"
        value={values.swish}
        onChange={handleChange}
        error={touched.swish && Boolean(errors.swish)}
        helperText={errors.swish}
      />
    </Box>
  );
};

export default PaymentSwish;
