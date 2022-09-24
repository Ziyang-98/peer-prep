import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SignInPage from "views/sign-in-page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

it("renders sign in correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test("renders sign in page correctly", () => {
//   render(
//     <Router>
//       <Routes>
//         <Route path="/" component={<SignInPage />} />
//       </Routes>
//     </Router>,
//   );
//   expect(screen.getByTitle("Sign In")).toBeInTheDocument();
// });
