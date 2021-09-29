/**
 * @jest-environment jsdom
 */
 import TestRenderer from 'react-test-renderer';
 import { MockedProvider } from '@apollo/client/testing';
 import React from 'react'
 import Home from '../pages/index'

 const mocks = []; // We'll fill this in next

it('renders without data', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain("Something went wrong");
 })