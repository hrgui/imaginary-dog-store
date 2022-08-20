import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import AppRoutes from "~/AppRoutes";
import renderWithAppProvider from "~/test-utils/renderWithAppProvider";

it("should render a shop with Cat and Dog", async () => {
  // act
  renderWithAppProvider(<AppRoutes />, { routerProps: { initialEntries: ["/"] } });

  // assert
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

  expect(await screen.findByText(/Cat/)).toBeVisible();
  expect(await screen.findByText(/Dog/)).toBeVisible();
});
