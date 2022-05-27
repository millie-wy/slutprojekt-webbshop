import { Box, Button, Container, Paper, SxProps, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../context/UserContextProvider";
import LoginForm from "./LoginForm";



const useStyles = makeStyles(theme => ({
    textFieldStyle: {
        marginTop: '2rem',
        "& .MuiInputBase-input": {
            "& fieldset": { 
                fontFamily: 'roboto',                
            },
        "&.MuiInputBase-input": {
            fontFamily: "prata",           
        }
    }
}
}))

const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required( "Password is required"),
  });


function Login() {
  const { handleSignIn } = useUser();
    const classes = useStyles()
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
          console.log("click")
          handleSignIn(values);
          console.log(values)
        },
      });

  
    return (
        <Container>
            <Box sx={boxStyle1}>
                <Link to="/login" style={{ textDecoration:'none', }}>
                <Typography sx={header1}>
                    Login
                </Typography>
                </Link>
                
                <Typography sx={{ fontSize:'2rem' }}> / </Typography>
             
                <Link to="/signup" style={{ textDecoration:'none', color: 'black',}}>
                <Typography sx={header2}>Sign up</Typography>
                </Link>
            </Box>
            <LoginForm/>
        </Container>
    );
}

const boxStyle1: SxProps = {
    display: 'flex', 
    flexDirection: 'row', 
    marginTop: '2rem', 
    textIndent: '1rem'
}
const boxStyle2: SxProps = {
    display: 'flex', 
    alignItems: 'center', 
    flexDirection: 'column'
}

const paperStyle: SxProps = {
    backgroundColor: '#C3BAB1',
    height: '30rem',
    width: '20rem',
    paddingTop: '2rem',
    marginTop: '3rem', 
    marginBottom: '3rem',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
const header1: SxProps = {
    fontSize: '2rem', 
    fontFamily: 'Prata', 
    color: 'black'
  }
  const header2: SxProps = {
    fontSize: '2rem', 
    fontFamily: 'Prata', 
    color: '#A8A8A8'
  }
  const header3: SxProps = {
    textAlign: 'center', 
    fontSize: '2rem', 
    fontFamily: "Prata", 
  }
  const buttonStyle: SxProps = {
    marginTop: '3rem', 
    backgroundColor: '#6C665F', 
    color:'#fff', 
    width: '8rem', 
    height: '3rem',
     '&:hover': {
        backgroundColor: '#857d75',
    }
  }

export default Login;