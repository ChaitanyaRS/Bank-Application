import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/userApi'

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    // }, [isAuthenticated]);

    const handleLogout = async () => {
        if (isAuthenticated) {
            const response = await dispatch(logoutUser());
            console.log("Handle Logout response :",response);
            
            if (response.meta.requestStatus === "fulfilled") {
                console.log("logout response = ", response);
                localStorage.removeItem('username');
                // settoggleLoggedInStatus(!toggleLoggedInStatus);
                console.log("Logout Success");
                navigate("/login");
            }
        } else {
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
                        {
                            !isAuthenticated ?
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                :
                                <Button onClick={handleLogout} color="inherit" component={Link}>
                                    Logout
                                </Button>
                        }
                        <Button color="inherit" component={Link} to="/user-details">
                            Profile
                        </Button>

                    </Toolbar>
                </AppBar>

            </div>
        </>
    )
}

export default Navbar
