import { Box, Container, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./CheckoutFormContainer";

const CustomerDetails = () => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

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
          mt: "3rem",
          mb: "1rem",
        }}
        variant="h5"
      >
        3. Delivery Details
      </Typography>
      <Box
        sx={{
          height: "fit-content",
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", sm: "80%", md: "70%" },
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontFamily: "Prata",
              mb: "1rem",
            }}
            variant="h6"
          >
            Address
          </Typography>
          {/* <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="name"
            name="name"
            label="Name"
            type="text"
            margin="normal"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={errors.name}
          /> */}
          <TextField
            fullWidth
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="deliveryAddress.street"
            name="deliveryAddress.street"
            label="Street"
            type="text"
            margin="normal"
            value={values.deliveryAddress.street}
            onChange={handleChange}
            error={
              touched.deliveryAddress?.street &&
              Boolean(errors.deliveryAddress?.street)
            }
            helperText={errors.deliveryAddress?.street}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="deliveryAddress.zipCode"
            name="deliveryAddress.zipCode"
            label="Zip Code"
            type="text"
            margin="normal"
            value={values.deliveryAddress.zipCode}
            onChange={handleChange}
            error={
              touched.deliveryAddress?.street &&
              Boolean(errors.deliveryAddress?.street)
            }
            helperText={errors.deliveryAddress?.street}
          />
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="deliveryAddress.city"
            name="deliveryAddress.city"
            label="City"
            type="text"
            margin="normal"
            value={values.deliveryAddress.city}
            onChange={handleChange}
            error={
              touched.deliveryAddress?.city &&
              Boolean(errors.deliveryAddress?.city)
            }
            helperText={errors.deliveryAddress?.city}
          />
          {/* <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="email"
            name="email"
            label="Email"
            type="text"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          /> */}
          <Typography
            sx={{
              textTransform: "uppercase",
              fontFamily: "Prata",
              mt: "2rem",
              mb: "1rem",
            }}
            variant="h6"
          >
            Contact Number
          </Typography>
          <TextField
            style={{
              backgroundColor: "white",
              height: "55px",
              marginBottom: "1rem",
            }}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            type="text"
            margin="normal"
            value={values.phoneNumber}
            onChange={handleChange}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CustomerDetails;
