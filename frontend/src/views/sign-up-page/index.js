import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { styles } from "./styles";
import useSignUp from "hooks/useSignUp";

const SignUpPage = () => {
  const { handleSignUp, loading, isSignupFailure } = useSignUp();

  return (
    <Container component="main" maxWidth="xs" sx={styles.page}>
      <CssBaseline />
      <Box sx={styles.mainContainer}>
        <Avatar sx={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h4">
          Create Account
        </Typography>
        {isSignupFailure && (
          <Alert sx={styles.invalidAlert} severity="error">
            Incorrect username or password
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={styles.formContainter}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            disabled={loading}
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
            disabled={loading}
          />

          <Box sx={styles.buttons}>
            <Button
              loading={loading}
              loadingPosition="start"
              startIcon={<></>}
              type="submit"
              variant="contained"
              sx={styles.signUpButton}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
