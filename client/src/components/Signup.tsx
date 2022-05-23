import { Box, Button, Container, Paper, SxProps, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, useFormik } from 'formik';


const useStyles = makeStyles(theme => ({
    textFieldStyle: {
        marginTop: '2rem',
        "& .MuiInputBase-input": {
            "& fieldset": { 
                fontFamily: 'roboto',
            },
        "&.MuiInputBase-input": {
            fontFamily: "roboto",
        }
    }
}
}))

const validationSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.number().required("Email is required"),
  password: yup.string().required( "Password is required"),
});


function Signup() {

    const classes = useStyles()
    const formik = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    return (
      <Container>
          <Box sx={boxStyle}>
                <Link to="/login" style={{ textDecoration:'none' }}>
                <Typography sx={header1}>Login</Typography>
                </Link>
                
                <Typography sx={{ fontSize:'2rem' }}>/</Typography>
             
                <Link to="/signup" style={{ textDecoration:'none' }}>
                <Typography sx={header2}>Sign up</Typography>
                </Link>
            </Box>
          <form onSubmit={formik.handleSubmit}>
            <Paper sx={paperStyle} >
                
                <Typography sx={header3}>Sign up</Typography>

                <Box sx={boxStyle2}>
                <TextField 
                className={classes.textFieldStyle}
                sx={{marginTop: '2rem' }}
                required
                type="text"
                label="First name"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                >
                </TextField>
                
                <TextField 
                className={classes.textFieldStyle}
                sx={{marginTop: '2rem', }}
                required
                type="text"
                label="Last name"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                >
                </TextField>

                <TextField 
                className={classes.textFieldStyle}
                sx={{marginTop: '2rem',}}
                required
                type="email"
                label="Email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                >
                </TextField>
                
                <TextField 
                className={classes.textFieldStyle}
                sx={{marginTop: '2rem', }}
                required
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                >
                </TextField>

                <Link to="/login"
                style={{textDecoration:'none', color: 'black', marginTop: '1rem', fontSize: '13px'}}>
                Sign in here
                </Link>

                <Button sx={buttonStyle} type="submit">Sign up</Button>
                </Box>          
                
            </Paper>
            </form>
      </Container>
    );
}

const paperStyle: SxProps = {
  backgroundColor: '#C3BAB1',
  height: '35rem',
  width: {xs:'20rem', sm: '25' ,md: '25rem', lg: '25rem', xl: '25rem'},
  paddingTop: '2rem',
  marginTop: '3rem', 
  marginBottom: '3rem',
  marginRight: 'auto',
  marginLeft: 'auto'
}
const header1: SxProps = {
  fontSize: '2rem', 
  fontFamily: 'Prata', 
  color: '#A8A8A8'
}
const header2: SxProps = {
  fontSize: '2rem', 
  fontFamily: 'Prata', 
  color: 'black'
}
const header3: SxProps = {
  textAlign: 'center', 
  fontSize: '2rem', 
  fontFamily: "Prata", 
}
const boxStyle: SxProps = {
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

export default Signup;