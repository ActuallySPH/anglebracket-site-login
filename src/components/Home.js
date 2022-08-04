import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function Home() {
    let navigate = useNavigate();
    const [ email, setEmail ] = useState('')
    const [ uid, setuid ] = useState('')
    const [ emailVerified, setEmailVerified ] = useState('')

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
            const user = JSON.parse(sessionStorage.getItem('Current User'))
            if (user !== null) {
              // The user object has basic properties such as display name, email, etc.
              setuid(user.uid)
              setEmail(user.email)
              setEmailVerified(user.emailVerified)
            }
        }

        if (!authToken) {
            navigate('/login')
        } 
    }, [navigate, uid, email, emailVerified])
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar className='App-header' sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <Button href="#" variant="outlined" onClick={handleLogout} sx={{ my: 1, mx: 1.5 }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          User Details
        </Typography>
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                 // src={user.avatar}
                  sx={{
                    height: 64,
                    mb: 2,
                    width: 64
                  }}
                />
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h5"
                >
                  {email}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {`${uid} ${emailVerified}`}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                fullWidth
                variant="text"
              >
              <EditIcon/>
              </Button>
            </CardActions>
          </Card>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <Home />;
}