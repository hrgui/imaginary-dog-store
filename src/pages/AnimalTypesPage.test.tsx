import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithAppProvider from "../test-utils/renderWithAppProvider";
import AnimalTypesPage from "./AnimalTypesPage";

it("should render a shop with Cat and Dog", async () => {
  // act
  renderWithAppProvider(<AnimalTypesPage />);

  // assert
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

  expect(await screen.findByText(/Cat/)).toBeVisible();
  expect(await screen.findByText(/Dog/)).toBeVisible();
});
