import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userLogin } from "api/index";
import { styles } from "./styles";

const SignInPage = () => {
  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    userLogin(data.get("email"), data.get("password"));
  };

  return (
    <Container component="main" maxWidth="xs" sx={styles.page}>
      <CssBaseline />
      <Box sx={styles.mainContainer}>
        <Avatar sx={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to PeerPrep
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignIn}
          noValidate
          sx={styles.formContainter}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Box container sx={styles.buttons}>
            <Button type="submit" variant="contained" sx={styles.signInButton}>
              Sign In
            </Button>
            <Link href="/signup" sx={styles.signUpLink}>
              Create account
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
