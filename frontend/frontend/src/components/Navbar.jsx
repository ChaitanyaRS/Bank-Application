import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../api/userApi'

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    const handleLogout = async () => {
        if(isAuthenticated){
        const response = await dispatch(logoutUser());
        if (response.meta.requestStatus === "fulfilled") {
            console.log(response);
            
            console.log("Logout Success");
            Navigate("/login");
        }}else{
            alert("User is already logged Out")
        }
    }
    return (
        <>
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/user-details">
                            Profile
                        </Button>
                        <Button onClick={handleLogout} color="inherit" component={Link}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>

            </div>
        </>
    )
}

export default Navbar
