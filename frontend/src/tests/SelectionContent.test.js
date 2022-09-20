import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SelectionContent from "views/selection-content";

it("renders correctly", () => {
  const tree = renderer.create(<SelectionContent />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders text in cards correctly", () => {
  render(<SelectionContent />);
  expect(screen.getByText("Easy")).toBeInTheDocument();
  expect(screen.getByText("Medium")).toBeInTheDocument();
  expect(screen.getByText("Hard")).toBeInTheDocument();
});

test("renders easy dialog correctly", async () => {
  render(<SelectionContent />);
  const difficulty = "Easy";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});

test("renders medium dialog correctly", async () => {
  render(<SelectionContent />);
  const difficulty = "Medium";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});

test("renders hard dialog correctly", async () => {
  render(<SelectionContent />);
  const difficulty = "Hard";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});

test("starts matching correctly", async () => {
  render(<SelectionContent />);
  const difficulty = "Easy";
  await userEvent.click(screen.getByText(difficulty));
  await userEvent.click(screen.getByText("Match"));

  expect(
    screen.getByText("Once matched, you will be redirected to a room."),
  ).toBeInTheDocument();
});
