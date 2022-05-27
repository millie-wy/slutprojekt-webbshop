import {
  Box,
  Button,
  Container,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../context/UserContextProvider";

const useStyles = makeStyles((theme) => ({
  textFieldStyle: {
    marginTop: "2rem",
    "& .MuiInputBase-input": {
      "& fieldset": {
        fontFamily: "roboto",
      },
      "&.MuiInputBase-input": {
        fontFamily: "roboto",
      },
    },
  },
}));

const validationSchema = yup.object({
  firstname: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Only latin letters are accepted."
    )
    .required("Firstname is required"),
  lastname: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Only latin letters are accepted."
    )
    .required("Lastname is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Minimum length: 8 characters.")
    .required("Password is required"),
});

function Signup() {
  const { handleSignUp } = useUser();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSignUp(values);
      console.log(values)
    },
  });

  return (
    <Container>
      <Box sx={boxStyle}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Typography sx={header1}>Login</Typography>
        </Link>

        <Typography sx={{ fontSize: "2rem" }}>/</Typography>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Typography sx={header2}>Sign up</Typography>
        </Link>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={paperStyle}>
          <Typography sx={header3}>Sign up</Typography>

          <Box sx={boxStyle2}>
            <TextField
              className={classes.textFieldStyle}
              sx={{ marginTop: "2rem" }}
              required
              type="text"
              label="First name"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            ></TextField>

            <TextField
              className={classes.textFieldStyle}
              sx={{ marginTop: "2rem" }}
              required
              type="text"
              label="Last name"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            ></TextField>

            <TextField
              className={classes.textFieldStyle}
              sx={{ marginTop: "2rem" }}
              required
              type="email"
              label="Email address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            ></TextField>

            <TextField
              className={classes.textFieldStyle}
              sx={{ marginTop: "2rem" }}
              required
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            ></TextField>

            <Link
              to="/checkoutpage"
              style={{
                textDecoration: "none",
                color: "black",
                marginTop: "1rem",
                fontSize: "13px",
              }}
            >
              Sign in here
            </Link>

            <Button sx={buttonStyle} type="submit">
              Sign up
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}

const paperStyle: SxProps = {
  backgroundColor: "#C3BAB1",
  height: "35rem",
  width: { xs: "20rem", sm: "25", md: "25rem", lg: "25rem", xl: "25rem" },
  paddingTop: "2rem",
  marginTop: "3rem",
  marginBottom: "3rem",
  marginRight: "auto",
  marginLeft: "auto",
};
const header1: SxProps = {
  fontSize: "2rem",
  fontFamily: "Prata",
  color: "#A8A8A8",
};
const header2: SxProps = {
  fontSize: "2rem",
  fontFamily: "Prata",
  color: "black",
};
const header3: SxProps = {
  textAlign: "center",
  fontSize: "2rem",
  fontFamily: "Prata",
};
const boxStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  marginTop: "2rem",
  textIndent: "1rem",
};
const boxStyle2: SxProps = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};
const buttonStyle: SxProps = {
  marginTop: "3rem",
  backgroundColor: "#6C665F",
  color: "#fff",
  width: "8rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: "#857d75",
  },
};

export default Signup;
