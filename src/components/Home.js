import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import {db} from '../firebase-config'

function Home() {
    let navigate = useNavigate();
    const [ firstName, setFirstName ] = useState('')
    const [ uid, setuid ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const [ editState, setEditState ] = useState(false)


    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }

    const handleEditBtnClick = () => {
      setEditState(true)
    }

    const  handleUpdateBtnClick = async () => {
      const userRef =  doc(db, 'anglebracket-collection', uid);
      await setDoc(userRef, { firstName: firstName, lastName: lastName, uid: uid});
      setEditState(false)
      setLoading(true)
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        const user = JSON.parse(sessionStorage.getItem('Current User'))
        setuid(user.uid)
        if (authToken) {
           // navigate('/home')
            (async () => {
              const q = query(collection(db, "anglebracket-collection"), where("uid", "==", uid));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const userDetails = doc.data();
                setFirstName(userDetails.firstName)
                setLastName(userDetails.lastName)
                setLoading(false)
              });
            })();
        }
        else{
            navigate('/login')
        }
        
    }, [navigate, uid, loading])
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
                {(() => {
                  if (editState) {
                    return(
                      <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                                  variant="standard"
                                  required
                                  id="firstName"
                                  label="First Name"
                                  name="firstname"
                                  autoComplete="firstname"
                                  defaultValue={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  autoFocus
                                />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                                  variant="standard"
                                  required
                                  id="lasttName"
                                  label="Last Name"
                                  name="lasttname"
                                  autoComplete="lasttname"
                                  defaultValue={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  autoFocus
                                />
                          </Grid>
                        </Grid>
                        )
                    } else {
                      return (<Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h5"
                    >
                      {loading ? "Loading....." : firstName+ "-" +lastName}
                    </Typography>)
                  }
                })()}           
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {`${uid}`}
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
                disabled={loading}
                >
              {editState? 
              <span onClick={() => (handleUpdateBtnClick())}>Update</span>
              :<EditIcon onClick={() => (handleEditBtnClick())
              }/>}
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