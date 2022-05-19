import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";



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
    email: yup.number().required("Email is required"),
    password: yup.string().required( "Password is required"),
  });
  

function Login() {

    const classes = useStyles()
    const formik = useFormik({
        initialValues: {
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
            <form onSubmit={formik.handleSubmit}>
            <Paper sx={{
                backgroundColor: '#C3BAB1',
                height: '30rem',
                width: '20rem',
                paddingTop: '2rem',
                marginTop: '3rem', 
                marginBottom: '3rem',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>
                <Typography sx={{ textAlign: 'center', fontSize: '2rem', fontFamily: "Prata", }}>Login</Typography>

                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Box >
                <TextField 
                sx={{marginTop:'3rem'}}
                className={classes.textFieldStyle}
                required
                type="email"
                label="Email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                >

                </TextField>
                </Box>
                <TextField 
                className={classes.textFieldStyle}
                sx={{marginTop: '3rem'}}
                required
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                >
                    
                </TextField>
                <Link to="/signup"
                style={{textDecoration:'none', color: 'black', marginTop: '1rem', fontSize: '13px'}}>
                No account? Sign up here
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
                >Login</Button>
                
                </Box>


                
            </Paper>
            </form>
        </Container>
    );
}

export default Login;