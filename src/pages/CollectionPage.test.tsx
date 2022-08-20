import AppRoutes from "../AppRoutes";
import renderWithAppProvider from "../test-utils/renderWithAppProvider";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setMyCollection } from "../mocks/handlers";

describe("no collection", () => {
  it("should render no collection when there are no items", async () => {
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: ["/collection"],
      },
    });

    expect(await screen.findByText(/No items found/)).toBeInTheDocument();
  });
});

describe("has a collection through pay now", () => {
  it("should render a list of cats given the URL with Buy now button that will prompt the user to go checkout", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/animals?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    //assert
    // TODO: assumption - assertion is using default handler and testing the handler logic
    expect(await screen.findByText(/Showing \d+ animals/)).toBeInTheDocument();
    const buyNow = await screen.findAllByText(/Buy Now/);
    expect(buyNow.length).toEqual(16);

    // arrange (for prompt user to go checkout)
    await userEvent.click(buyNow[0]);
    expect(await screen.findByText(/Checkout/)).toBeInTheDocument();
    const payNow = await screen.findByText(/Pay now/);
    await userEvent.click(payNow);

    // in collection page, we should get 1 cat
    expect(await screen.findByText(/Collection/)).toBeInTheDocument();
    expect(await screen.findByText(/George, the Cat/)).toBeInTheDocument();
  });
});

describe("more than 1 item in the collection", () => {
  it("should render a list of cats given the URL with Buy now button that will prompt the user to go checkout", async () => {
    //arrange
    setMyCollection([
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
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: ["/collection"],
      },
    });

    expect(await screen.findByText(/Collection/)).toBeInTheDocument();
    expect(await screen.findByText(/George, the Cat/)).toBeInTheDocument();
    expect(await screen.findByText(/Mercedes, the Dog/)).toBeInTheDocument();
  });
});
