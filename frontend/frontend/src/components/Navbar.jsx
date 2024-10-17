import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                        <Button color="inherit" component={Link} to="/profile">
                            Profile
                        </Button>
                    </Toolbar>
                </AppBar>

            </div>
        </>
    )
}

export default Navbar
