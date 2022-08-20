import AppRoutes from "~/AppRoutes";
import renderWithAppProvider from "~/test-utils/renderWithAppProvider";
import { screen } from "@testing-library/react";

describe("item not found", () => {
  it("should return not found if the item id is incorrect", async () => {
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: ["/item/a572019e-7073-44dd-aa44-d59af0a4aacd"],
      },
    });

    expect(await screen.findByText(/Not found/)).toBeInTheDocument();
  });
});
