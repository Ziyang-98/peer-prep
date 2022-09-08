import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { styles } from "./styles";
import useProfile from 'hooks/useProfile';

const ProfilePage = () => {
  const { handleDeleteUser, handleChangePassword } = useProfile();

  return (
    <Container>
      <Button onClick={handleDeleteUser}>Delete User</Button>

      <Box component="form" onSubmit={handleChangePassword} sx={styles.formContainter}>
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
                variant="contained">
                Change Password
              </Button>
            </Box>
      </Box>
    </Container>
  )
}

export default ProfilePage;