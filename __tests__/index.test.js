/**
 * @jest-environment jsdom
 */
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

    const card1 = screen.getByText("venusaur");
    const card2 = screen.getByText("charmander");
    const card3 = screen.getByText("squirtle");
    expect(card1).toBeTruthy();
    expect(card2).toBeTruthy();
    expect(card3).toBeTruthy();
  });

  test("changing input text", async () => {
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

    // delete input text
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

    // check the previous list
    const venusaur = screen.getByText("venusaur");
    expect(venusaur).toBeTruthy();

    const input = screen.getByTestId("input-pokename");
    const search = screen.getByText("Search");
    expect(input).toBeTruthy();
    expect(search).toBeTruthy();

    act(() => {
      fireEvent.change(input, { target: { value: "ditto" } });
    });

    expect(input.value).toBe("ditto");

    act(() => {
      fireEvent.click(search);
    });

    await waitFor(() => screen.getByText("Loading..."));
    await new Promise((resolve) => setTimeout(resolve, 1500)); // wait for state update

    const ditto = screen.getByText("ditto");
    const _venusaur = screen.queryByText("venusaur");
    expect(ditto).toBeTruthy(); // check the search result
    expect(_venusaur).toBeFalsy(); // check if the previous list is removed
  });

  it("should refetch", async () => {
    await act(async () =>
      render(
        <MockedProvider mocks={[pokeMock]} addTypename={true}>
          <Home data={pokeMock.result.data} />
        </MockedProvider>
      )
    );

    // check the previous list
    const venusaur = screen.getByText("venusaur");
    expect(venusaur).toBeTruthy();

    const input = screen.getByTestId("input-pokename");
    const search = screen.getByText("Search");
    expect(input).toBeTruthy();
    expect(search).toBeTruthy();

    act(() => {
      fireEvent.click(search);
    });

    await waitFor(() => screen.getByText("Loading..."));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // check the latest list
    const ivysaur = screen.getByText("ivysaur");
    expect(ivysaur).toBeTruthy();
  });
});
