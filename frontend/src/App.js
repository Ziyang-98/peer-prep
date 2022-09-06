import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "views/sign-in-page";
import SignUpPage from "views/sign-up-page";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "common/theme.js";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ height: "100vh" }}
          bgcolor="primary.main"
        >
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/login" />}
              ></Route>
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
