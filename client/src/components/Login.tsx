import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";





function Login() {
    return (
        <Container>
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
                sx={{marginTop:'3rem', backgroundColor: '#fff'}}
                required
                label="Email address"
                >

                </TextField>
                </Box>
                <TextField 
                sx={{marginTop: '3rem', backgroundColor: '#fff'}}
                required
                label="Password"
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
                >Login</Button>
                
                </Box>



            </Paper>
        </Container>
    );
}

export default Login;