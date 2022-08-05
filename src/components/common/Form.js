import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Form({title, setPassword, setEmail, setFirstName, setLastName, handleAction }) {
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {(() => {
                    if(title === 'Register'){
                      return(<LockOutlinedIcon />)
                    }
                  }
                )()}
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" onSubmit={handleAction} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {title}
            </Button>
            <Grid container>
              <Grid item>
                {(() => {
                  if (title === 'Login') {
                    return( <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>)
                  } else if(title === 'Register'){
                    return(<Link href="/" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>)
                  }
                }
                )()}
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  )
}
