import renderer from "react-test-renderer";
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

test("renders sign in page correctly", async () => {
  render(
    <Router location={"/"}>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>,
  );

  expect(
    screen.getByRole("heading", {
      name: /sign in/i,
    }),
  ).toHaveTextContent("Sign In");
});
