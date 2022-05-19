import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
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
            fontFamily: "prata",
            
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
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Paper sx={{
                backgroundColor: '#C3BAB1',
                height: '35rem',
                width: {xs:'20rem', sm: '25' ,md: '25rem', lg: '25rem', xl: '25rem'},
                paddingTop: '2rem',
                marginTop: '3rem', 
                marginBottom: '3rem',
                marginRight: 'auto',
                marginLeft: 'auto'}}
                >
                
                <Typography sx={{ textAlign: 'center', fontSize: '2rem', fontFamily: "Prata", }}>Sign up</Typography>

               
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
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
                sx={{marginTop: '2rem', color: 'white' }}
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
                sx={{marginTop: '2rem', fontFamily: 'roboto' }}
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

                <Button 
                sx={{ 
                marginTop: '3rem', 
                backgroundColor: '#6C665F', 
                color:'#fff', 
                width: '8rem', 
                height: '3rem',
                '&:hover': {
                    backgroundColor: '#857d75',
                }
                }}
                type="submit"
                >Sign up</Button>
               
                </Box>          
                
            </Paper>
            </form>
        </Box>
    );
}


export default Signup;