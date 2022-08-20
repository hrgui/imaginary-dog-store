// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import fetch from "cross-fetch";
import { reset } from "./mocks/handlers";

global.fetch = fetch;

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  reset();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
