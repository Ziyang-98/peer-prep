import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { styles } from "./styles";
import useProfile from "hooks/useProfile";

const ProfilePage = () => {
  const {
    handleDeleteUser,
    handleChangePassword,
    isInvalidAction,
    isSuccessAction,
    errorMessage,
    successMessage,
  } = useProfile();

  return (
    <Container sx={styles.container}>
      {isInvalidAction && (
        <Alert sx={styles.invalidAlert} severity="error">
          {errorMessage}
        </Alert>
      )}

      {isSuccessAction && (
        <Alert sx={styles.invalidAlert} severity="success">
          {successMessage}
        </Alert>
      )}

      <Box sx={styles.buttons}>
        <Button
          loadingPosition="start"
          startIcon={<></>}
          type="submit"
          variant="contained"
          onClick={handleDeleteUser}
          sx={styles.button}
        >
          Delete User
        </Button>
      </Box>

      <Box
        component="form"
        onSubmit={handleChangePassword}
        sx={styles.formContainter}
      >
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

        <Box sx={styles.buttons}>
          <Button
            loadingPosition="start"
            startIcon={<></>}
            type="submit"
            variant="contained"
            sx={styles.button}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
