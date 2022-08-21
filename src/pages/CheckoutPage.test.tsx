import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppRoutes from "~/AppRoutes";
import { setMyCart } from "~/mocks/handlers";
import renderWithAppProvider from "~/test-utils/renderWithAppProvider";

describe("delete from cart", () => {
  it("should be able to Delete from cart", async () => {
    setMyCart([
      {
        id: "ab0a9413-e2ad-412a-9eca-13fedfd7d912",
        name: "George, the Cat",
        type_id: "b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        thumbnail: "https://placekitten.com/300/300?image=1",
        large_img: "https://placekitten.com/600/600?image=1",
        price: "69.00",
      },
      {
        id: "7fda0bd1-f589-4a2e-8665-6b44ed775bc2",
        name: "Mercedes, the Dog",
        type_id: "933e8cad-1e6d-426f-bdb9-af540a6df3ad",
        thumbnail: "https://placedog.net/300/300?id=1",
        large_img: "https://placedog.net/600/600?id=1",
        price: "11.00",
      },
    ]);

    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: ["/checkout"],
      },
    });

    const delButtons = await screen.findAllByText(/Delete/);
    expect(delButtons.length).toEqual(2);

    await userEvent.click(delButtons[0]);

    waitForElementToBeRemoved(async () => await screen.findByText("George, the Cat"));
    const totals = await screen.findAllByText(/Total: \$11.00/);
    expect(totals.length).toEqual(2); // on top and bottom
  });
});
