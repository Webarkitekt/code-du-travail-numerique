import React from "react";
import { render } from "@testing-library/react";
import { Title } from ".";

describe("<Title />", () => {
  it("renders a H2 title ", () => {
    const { container } = render(<Title>Lorem Ipsum</Title>);
    expect(container).toMatchSnapshot();
  });
  it("renders a shifted H2 title (the stripe should be 10rem to the left)", () => {
    const { container } = render(<Title shift="10rem">Lorem Ipsum</Title>);
    expect(container).toMatchSnapshot();
  });
});
