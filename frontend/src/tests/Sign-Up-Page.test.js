import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import SignUpPage from "views/sign-up-page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

it("renders sign in correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
        </Routes>
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
