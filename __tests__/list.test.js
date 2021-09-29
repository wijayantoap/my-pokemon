/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import List from "../pages/list";

describe("List", () => {
  it("should render the page", async () => {
    await act(async () => render(<List />));

    const home = screen.getByText("Home");
    const info = screen.getByText("Try catching your first Pokémon");
    expect(home).toBeTruthy();
    expect(info).toBeTruthy();
  });
});
