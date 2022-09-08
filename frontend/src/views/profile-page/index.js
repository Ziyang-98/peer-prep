import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { styles } from "./styles";
// import useChangePassword from "hooks/"

const ProfilePage = () => {
//   const { handleChangePassword } = useChangePassword();

  return (
    <div>this is profile</div>
    // <Box component="form" onSubmit={handleChangePassword} sx={styles.formContainter}>
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         disabled={loading}
    //       />

    //       <Box sx={styles.buttons}>
    //         <Button
    //           loading={loading}
    //           loadingPosition="start"
    //           startIcon={<></>}
    //           type="submit"
    //           variant="contained"
    //           sx={styles.signInButton}
    //         >
    //           Sign In
    //         </Button>
    //         <Link href="/signup" sx={styles.signUpLink}>
    //           Create account
    //         </Link>
    //       </Box>
    // </Box>
  )
}

export default ProfilePage;