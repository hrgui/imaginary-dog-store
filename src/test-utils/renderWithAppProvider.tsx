import React from "react";
import AppProvider from "../AppProvider";
import { render } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

type Options = {
  routerProps?: MemoryRouterProps;
};

const renderWithAppProvider = (ui: React.ReactElement, options: Options = {}) => {
  return {
    ...render(
      <MemoryRouter {...options.routerProps}>
        <AppProvider>{ui}</AppProvider>
      </MemoryRouter>
    ),
  };
};

export default renderWithAppProvider;
