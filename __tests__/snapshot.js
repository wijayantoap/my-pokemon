import React from "react";
import renderer from "react-test-renderer";
import Details from "../pages/details/[name]";
import List from "../pages/list";
import Index from "../pages/index";

it("renders homepage unchanged", () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders details unchanged", () => {
  const tree = renderer.create(<Details />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders list unchanged", () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});
