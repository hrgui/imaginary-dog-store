import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render a shop", async () => {
  render(<App basename="/" />);
  expect(screen.getByText(/Find a Item/)).toBeVisible();
  expect(screen.getByText(/Collection/)).toBeVisible();
});
