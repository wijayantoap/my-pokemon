/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import List from "../pages/list";

jest.mock("react-chartjs-2", () => ({
  Radar: () => null,
}));

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }
}

global.localStorage = new LocalStorageMock();

describe("List", () => {
  it("should render the page", async () => {
    await act(async () => render(<List />));

    const home = screen.getByText("Home");
    const info = screen.getByText("Try catching your first Pokémon");
    expect(home).toBeTruthy();
    expect(info).toBeTruthy();
  });

  it("should show owned pokemon", async () => {
    localStorage.setItem(
      "pokemons",
      JSON.stringify([
        {
          name: "charizard",
          nickname: "Booyah",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
          data: [93, 0, 92, 86, 34, 28],
        },
      ])
    );

    await act(async () => render(<List />));

    const charizard = screen.getByText("Booyah");
    expect(charizard).toBeTruthy();
  });

  it("should remove owned pokemon", async () => {
    localStorage.setItem(
      "pokemons",
      JSON.stringify([
        {
          name: "charizard",
          nickname: "Booyah",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
          data: [93, 0, 92, 86, 34, 28],
        },
      ])
    );

    await act(async () => render(<List />));

    const charizard = screen.getByText("Booyah");
    expect(charizard).toBeTruthy();

    const releaseButton = screen.getByText("Release");
    expect(releaseButton).toBeTruthy();

    act(() => {
      fireEvent.click(releaseButton);
    });

    await waitFor(() => screen.getByText("Yes"));

    act(() => {
      fireEvent.click(screen.getByText("Yes"));
    });

    await waitFor(() => screen.getByText("Try catching your first Pokémon")); // Successfully removed from the list
  });
});
