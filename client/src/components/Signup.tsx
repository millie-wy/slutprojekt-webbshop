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
import ErrorSnackBar from "./shared/ErrorSnackBar";
import NoPermission from "./shared/NoPermission";

const useStyles = makeStyles((theme) => ({
  textFieldStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '5px',
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
  const { handleSignUp, currentUser } = useUser();
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
    onSubmit: (values) => handleSignUp(values),
  });

  if (!currentUser) {
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
              />

              <TextField
                className={classes.textFieldStyle}
                sx={{ marginTop: "2rem" }}
                required
                type="text"
                label="Last name"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

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
              />

              <TextField
                className={classes.textFieldStyle}
                sx={{ marginTop: "2rem" }}
                required
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Link
                to="/login"
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

              <ErrorSnackBar />
            </Box>
          </Paper>
        </form>
      </Container>
    );
  } else {
    return (
      <NoPermission
        page="No permission"
        description="You must log out before creating a new account."
      />
    );
  }
}

const paperStyle: SxProps = {
  background: "#C3BAB1",
  height: "fit-content",
  maxWidth: "20rem",
  width: "100%",
  paddingTop: "2rem",
  margin: "3rem auto",
  marginTop: "1.5rem",
  paddingBottom: "2rem",
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
  marginTop: "1.5rem",
  backgroundColor: "#6C665F",
  color: "#fff",
  width: "8rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: "#857d75",
  },
};

export default Signup;
