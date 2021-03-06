import React from "react";
import { render } from "@testing-library/react";
import { Table } from ".";

describe("<Table />", () => {
  test("should render", () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <th>Line 1</th>
            <td>some data</td>
            <td>some data</td>
          </tr>
          <tr>
            <th>Line 2</th>
            <td>some data</td>
            <td>some data</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(container).toMatchSnapshot();
  });
});
