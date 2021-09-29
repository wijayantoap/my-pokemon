/**
 * @jest-environment jsdom
 */
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import Home from "../pages/index";
import pokeMock from "../__mocks__/pokeMock";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import errorMock from "../__mocks__/errorMock";
import pokeSearchMock from "../__mocks__/pokeSearchMock";

describe("Home", () => {
  it("should show error UI", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[errorMock]} addTypename={true}>
          <Home />
        </MockedProvider>
      )
    );

    const message = screen.getByText("Something went wrong");
    expect(message).toBeTruthy();
  });

  it("should render the page", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeMock]} addTypename={true}>
          <Home data={pokeMock.result.data} />
        </MockedProvider>
      )
    );

    const header = screen.getByText("My Pokémon");
    const input = screen.getByTestId("input-pokename");
    expect(header).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it("should display pokemon list", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeMock]} addTypename={true}>
          <Home data={pokeMock.result.data} />
        </MockedProvider>
      )
    );

    await waitFor(() => screen.getByText("My Pokémon"));

    const card = screen.getByText("venusaur");
    expect(card).toBeTruthy();
  });

  test("changin input text", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeMock]} addTypename={true}>
          <Home data={pokeMock.result.data} />
        </MockedProvider>
      )
    );

    const input = screen.getByTestId("input-pokename");

    fireEvent.change(input, { target: { value: "wartortle" } });
    expect(input.value).toBe("wartortle");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("should search by name", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeMock, pokeSearchMock]} addTypename={true}>
          <Home data={pokeMock.result.data} />
        </MockedProvider>
      )
    );

    const venusaur = screen.getByText("venusaur");
    expect(venusaur).toBeTruthy();

    const input = screen.getByTestId("input-pokename");
    const search = screen.getByText("Search");
    expect(input).toBeTruthy();
    expect(search).toBeTruthy();

    fireEvent.change(input, { target: { value: "ditto" } });
    expect(input.value).toBe("ditto");
  });
});
