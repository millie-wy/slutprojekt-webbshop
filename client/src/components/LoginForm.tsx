import {
  Box,
  Button,
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

const useStyles = makeStyles((theme) => ({
  textFieldStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "5px",
    marginTop: "2rem",
    "& .MuiInputBase-input": {
      "& fieldset": {
        fontFamily: "roboto",
      },
      "&.MuiInputBase-input": {
        fontFamily: "prata",
      },
    },
  },
}));

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginForm() {
  const { handleSignIn } = useUser();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontFamily: "prata", marginTop: "2rem" }}
      >
        Sign in to checkout
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={paperStyle}>
          <Typography sx={header3}>Login</Typography>

          <Box sx={boxStyle2}>
            <TextField
              sx={{ marginTop: "3rem" }}
              className={classes.textFieldStyle}
              required
              type="email"
              label="Email address"
              name="email"
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
            ></TextField>

            <TextField
              className={classes.textFieldStyle}
              sx={{ marginTop: "3rem" }}
              required
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
            ></TextField>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "black",
                marginTop: "1rem",
                fontSize: "13px",
              }}
            >
              No account? Sign up here
            </Link>
            <Button sx={buttonStyle} type="submit">
              Login
            </Button>

            <ErrorSnackBar />
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

const boxStyle2: SxProps = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const paperStyle: SxProps = {
  backgroundColor: "#C3BAB1",
  height: "30rem",
  width: { xs: "18rem", sm: "20rem" },
  paddingTop: "2rem",
  marginTop: "1.5rem",
  marginBottom: "3rem",
  marginRight: "auto",
  marginLeft: "auto",
};

const header3: SxProps = {
  textAlign: "center",
  fontSize: "2rem",
  fontFamily: "Prata",
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

export default LoginForm;
