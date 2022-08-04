import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/FormNew';
import Home from './components/Home';
import {app} from './firebase-config'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FromNew from './components/common/FormNew'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (e, id) => {
    e.preventDefault()
    const authentication = getAuth(app);
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          else if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
          else if(error.code){
            toast.error('Something went wrong');
          }
        })
    }else if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
          else if(error.code){
            toast.error('Something went wrong');
          }
        })
    }
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/home')
    }
  }, [navigate])
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path='/'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={(e) => handleAction(e, 1)}
              />}
          />
          <Route
            path='/register'
            element={
              <FromNew
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={(e) => handleAction(e, 2)}
              />}
          />
          <Route
            path='/home'
            element={
              <Home />}
          />
        </Routes>
      </>
      <ToastContainer />
    </div>
  );
}

export default App;