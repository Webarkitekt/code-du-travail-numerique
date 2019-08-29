import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@cdt/ui";
import { OnChange } from "react-final-form-listeners";

import { Label, InlineError } from "../common/stepStyles";
import { required } from "./validators";

function SelectQuestion({ name, label, options, onChange }) {
  const uid = `input-${name}`;
  if (!Array.isArray(options)) {
    options = Object.entries(options);
  }
  return (
    <Field
      name={name}
      validate={required}
      subscription={{ value: true, error: true, dirty: true }}
    >
      {({ input, meta: { error, dirty } }) => {
        return (
          <Wrapper>
            <Label htmlFor={uid}>{label}</Label>
            <Select {...input} id={uid}>
              <option disabled value="">
                ...
              </option>
              {options.map(option => {
                let key, label;
                if (Array.isArray(option)) {
                  [key, label] = option;
                } else {
                  key = label = option;
                }

                return (
                  <option value={key} key={key}>
                    {label}
                  </option>
                );
              })}
            </Select>
            {error && dirty && <InlineError>{error}</InlineError>}
            {onChange && (
              <OnChange name={name}>{values => onChange(values)}</OnChange>
            )}
          </Wrapper>
        );
      }}
    </Field>
  );
}

SelectQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func
};

export { SelectQuestion };

const { spacing } = theme;

const Select = styled.select`
  margin-top: ${spacing.small};
  margin-right: ${spacing.interComponent};
  flex: 1 1 70%;
  min-width: 400px;
  max-width: 100%;
`;

const Wrapper = styled.div`
  margin: ${spacing.interComponent} 0;
`;