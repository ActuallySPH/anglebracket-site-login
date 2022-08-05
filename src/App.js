import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/FormNew';
import RegistrationForm from './components/common/Form';
import Home from './components/Home';
import {app, db} from './firebase-config'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from "firebase/firestore"; 


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const authentication = getAuth(app);

  let navigate = useNavigate();
  const handleAction = (e, id) => {
    e.preventDefault()
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          sessionStorage.setItem('Current User', JSON.stringify(response.user))
          navigate('/home')
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
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          sessionStorage.setItem('Current User', JSON.stringify(response.user))
        })
        .then(() => {

          (async () => {
            await setDoc(doc(db,"anglebracket-collection", authentication.currentUser.uid), {
              uid: authentication.currentUser.uid,
              firstName: firstName,
              lastName: lastName,
            });
            navigate('/home')
          })();
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
              <RegistrationForm
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                setFirstName={setFirstName}
                setLastName={setLastName}
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