import React from "react";
import { render } from "@testing-library/react";
import { Question } from "../Question";

describe("<Question />", () => {
  it("should render question", () => {
    const { container } = render(<Question>ma question</Question>);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        margin-top: 1.25rem;
        margin-bottom: 0.625rem;
        font-size: 1.25rem;
        cursor: pointer;
      }

      <div>
        <label
          class="c0"
        >
          ma question
        </label>
      </div>
    `);
  });
  it("should render mandatory question", () => {
    const { container } = render(
      <Question required>ma question obligatoire</Question>
    );
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        margin-top: 1.25rem;
        margin-bottom: 0.625rem;
        font-size: 1.25rem;
        cursor: pointer;
      }

      .c1 {
        display: inline-block;
        margin-left: 0.625rem;
        color: #b50113;
        font-weight: 700;
      }

      <div>
        <label
          class="c0"
        >
          ma question obligatoire
          <span
            aria-label="champs obligatoire"
            class="c1"
          >
            *
          </span>
        </label>
      </div>
    `);
  });
});