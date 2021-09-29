/**
 * @jest-environment jsdom
 */
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import errorSearchMock from "../__mocks__/errorSearchMock";
import pokeSearchMock from "../__mocks__/pokeSearchMock";
import Details from "../pages/details/[name].js";

// https://github.com/reactchartjs/react-chartjs-2/issues/155
jest.mock("react-chartjs-2", () => ({
  Radar: () => null,
}));

describe("Details", () => {
  it("should show error UI", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[errorSearchMock]} addTypename={true}>
          <Details />
        </MockedProvider>
      )
    );

    const message = screen.getByText("Something went wrong");
    expect(message).toBeTruthy();
  });

  it("should render the page", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeSearchMock]} addTypename={true}>
          <Details data={pokeSearchMock.result.data} />
        </MockedProvider>
      )
    );

    const home = screen.getByText("Home");
    const list = screen.getByText("List");
    expect(home).toBeTruthy();
    expect(list).toBeTruthy();
  });

  it("should display pokemon details", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeSearchMock]} addTypename={true}>
          <Details data={pokeSearchMock.result.data} />
        </MockedProvider>
      )
    );

    const name = screen.getByText("ditto");
    expect(name).toBeTruthy();
  });

  it("should catch", async () => {
    jest.useFakeTimers();
    global.Math.random = () => 0.7;

    await act(async () =>
      render(
        <MockedProvider mocks={[pokeSearchMock]} addTypename={true}>
          <Details data={pokeSearchMock.result.data} />
        </MockedProvider>
      )
    );

    const catchButton = screen.getByText("Catch");
    expect(catchButton).toBeTruthy();

    act(() => {
      fireEvent.click(catchButton);
    });

    await waitFor(() => screen.getByText("Catching..."));
    jest.advanceTimersByTime(1500);
    await waitFor(() => screen.getByText("Release"));
  });

  it("should failed to catch", async () => {
    jest.useFakeTimers();
    global.Math.random = () => 0.2;

    await act(async () =>
      render(
        <MockedProvider mocks={[pokeSearchMock]} addTypename={true}>
          <Details data={pokeSearchMock.result.data} />
        </MockedProvider>
      )
    );

    const catchButton = screen.getByText("Catch");
    expect(catchButton).toBeTruthy();

    act(() => {
      fireEvent.click(catchButton);
    });

    await waitFor(() => screen.getByText("Catching..."));
    jest.advanceTimersByTime(1500);
    await waitFor(() => screen.getByText("Failed to catch!"));
  });
});
