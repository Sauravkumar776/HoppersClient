import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";
import { useState } from "react";
// import { UserContext } from "../../contexts/user.context.jsx";
// import { useContext } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Capstone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  // const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const {user} = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // setCurrentUser(user);
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("no user assosciated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
    // createUserDocumentFromAuth(user);
    // setCurrentUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

// import { useEffect } from "react";
// import { getRedirectResult } from 'firebase/auth';
// useEffect( () => {
// used for google Redirect so that the state or data of user won't loose after the change in page.

//   async function fetchGooleRedirect(){
//   const response = await getRedirectResult(auth);
//   if(response){
//     const userDocRef = await createUserDocumentFromAuth(response.user)
//   }
// }
// fetchGooleRedirect();
// }, [])

//  {/* <button onClick={signiInWithGoogleRedirect}>sign in with google Redirect</button> */}

// import { auth,createUserDocumentFromAuth, signiInWithGoogleRedirect, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";

// const SignIn = () => {
//   const logGoogleUser = async () => {
//     const {user} = await signInWithGooglePopUp();
//     const userDocRef= await createUserDocumentFromAuth(user);
//     console.log(user);
//     console.log(userDocRef)
//   };

//   return (
//     <>
//       <h1> sign In</h1>
//       <button onClick={logGoogleUser}>sign in with google popup</button>
//     </>
//   );
// };
// export default SignIn;

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     email: data.get('email'),
//     password: data.get('password'),
//   });

//   const userDocRef =  createUserDocumentFromAuth(data);
//   console.log(userDocRef);
// };
