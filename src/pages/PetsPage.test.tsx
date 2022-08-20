import { fireEvent, screen } from "@testing-library/react";
import AppRoutes from "~/AppRoutes";
import renderWithAppProvider from "~/test-utils/renderWithAppProvider";
import userEvent from "@testing-library/user-event";

describe("buy now and regular click", () => {
  it("should render a list of cats given the URL with Buy now button that will prompt the user to go checkout", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    //assert
    // TODO: assumption - assertion is using default handler and testing the handler logic
    expect(await screen.findByText(/Showing \d+ pets/)).toBeInTheDocument();
    const buyNow = await screen.findAllByText(/Buy Now/);
    expect(buyNow.length).toEqual(16);

    // arrange (for prompt user to go checkout)
    await userEvent.click(buyNow[0]);
    expect(await screen.findByText(/Checkout/)).toBeInTheDocument();
  });

  it("should not be able to have 2 of the same item in the cart (because there is only 1 of each item)", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    //assert
    // TODO: assumption - assertion is using default handler and testing the handler logic
    expect(await screen.findByText(/Showing \d+ pets/)).toBeInTheDocument();
    const buyNow = await screen.findAllByText(/Buy Now/);
    expect(buyNow.length).toEqual(16);

    // user is now in checkout
    await userEvent.click(buyNow[0]);
    expect(await screen.findByText(/Checkout/)).toBeInTheDocument();

    const goBackButton = await screen.findByText(/go back/);
    await userEvent.click(goBackButton);

    // 2nd attempt to buy now
    const buyNow2 = await screen.findAllByText(/Buy Now/);
    expect(buyNow2.length).toEqual(16);
    await userEvent.click(buyNow2[0]);

    expect(await screen.findByText(/Checkout/)).toBeInTheDocument();

    // should only get 1 cat in the cart
    const headers = await screen.findAllByText(/(\w+), the Cat/);
    expect(headers.length).toEqual(1);
  });

  it("should render a list of cats given the URL with Buy now button that will prompt the user to go checkout", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    //assert
    // TODO: assumption - assertion is using default handler and testing the handler logic
    expect(await screen.findByText(/Showing \d+ pets/)).toBeInTheDocument();
    const header = await screen.findByText(/George, the Cat/i);

    // arrange (for prompt user to go view page)
    await userEvent.click(header);
    expect(await screen.findByText(/George, the Cat/)).toBeInTheDocument();
  });
});

describe("buy now and regular click", () => {
  it("should filter down the cats by URL - min_price=80 to max_price=100 would return 3 cats", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=80&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    //assert
    // TODO: assumption - assertion is using default handler and testing the handler logic
    expect(await screen.findByText(/Min Price \$80\.00/)).toBeInTheDocument();
    expect(await screen.findByText(/Showing \d+ pets/)).toBeInTheDocument();
    const buyNow = await screen.findAllByText(/Buy Now/);
    expect(buyNow.length).toEqual(3);
  });

  it("should filter down the cats by slider - min_price=80 to max_price=100 would return 3 cats", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    const minPriceSlider = screen.getByTestId("min_price");

    fireEvent.change(minPriceSlider, { target: { value: "80" } });

    expect(await screen.findByText(/Min Price \$80\.00/)).toBeInTheDocument();
  });

  it("should filter down the cats by search - typing in Lorena will return 1 cat", async () => {
    //act
    //TODO: hardcode - b77dbbdc-f8a6-48c3-a0fb-18dce43ae359 is cat
    renderWithAppProvider(<AppRoutes />, {
      routerProps: {
        initialEntries: [
          "/pets?min_price=0&max_price=100&name=&type_id=b77dbbdc-f8a6-48c3-a0fb-18dce43ae359",
        ],
      },
    });

    const search = screen.getByPlaceholderText(/Search/);

    await userEvent.type(search, "Lorena");
    expect(await screen.findByText(/Showing 1 pets/)).toBeInTheDocument();
  });
});
