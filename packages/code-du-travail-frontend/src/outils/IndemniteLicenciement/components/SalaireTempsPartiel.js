import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { icons, Input, Label, Select, Text, theme } from "@socialgouv/react-ui";

import { AddButton, DelButton } from "../../common/Buttons";
import { Error } from "../../common/ErrorField";
import { MultiFieldRow } from "../../common/MultiFieldRow";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";

export const TEMPS_PLEIN = "Temps plein";
export const TEMPS_PARTIEL = "Temps partiel";

const PERIOD_TYPES = [TEMPS_PARTIEL, TEMPS_PLEIN];

export const SalaireTempsPartiel = ({ name }) => (
  <FieldArray name={name}>
    {({ fields }) =>
      fields.length > 0 && (
        <>
          <Question as="p">
            Quels ont été les durées et les salaires des périodes à temps plein
            et à temps partiel&nbsp;?
          </Question>
          {fields.map((name, index) => (
            <RelativeDiv key={name}>
              <RowTitle>
                <Text variant="secondary" fontSize="hsmall">
                  Période {index + 1}
                </Text>
              </RowTitle>
              <MultiFieldRow
                gridRows={["auto", "auto"]}
                gridColumns={["2fr", "1fr", "1fr", "13rem"]}
                emptyCells={[7]}
              >
                <Label htmlFor={`${name}.type`}>Type de durée de travail</Label>
                <FieldWrapper>
                  <Field name={`${name}.type`} id={`${name}.type`}>
                    {({ input }) => (
                      <StyledSelect {...input}>
                        {PERIOD_TYPES.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </StyledSelect>
                    )}
                  </Field>
                </FieldWrapper>
                <Label htmlFor={`${name}.duration`}>Durée (en mois)</Label>
                <FieldWrapper>
                  <Field
                    name={`${name}.duration`}
                    validate={isNumber}
                    subscription={{
                      value: true,
                      error: true,
                      touched: true,
                      invalid: true,
                    }}
                    render={({ input, meta: { touched, error, invalid } }) => (
                      <>
                        <Input
                          {...input}
                          id={`${name}.duration`}
                          type="number"
                          invalid={touched && invalid}
                        />
                        {error && touched && invalid && (
                          <StyledError>{error}</StyledError>
                        )}
                      </>
                    )}
                  />
                </FieldWrapper>
                <Label htmlFor={`${name}.salary`}>Rémunération</Label>
                <div>
                  <Field
                    name={`${name}.salary`}
                    validate={isNumber}
                    subscription={{
                      value: true,
                      error: true,
                      touched: true,
                      invalid: true,
                    }}
                    render={({ input, meta: { touched, error, invalid } }) => (
                      <>
                        <Input
                          {...input}
                          id={`${name}.salary`}
                          type="number"
                          invalid={touched && invalid}
                          icon={icons.Euro}
                        />
                        {error && touched && invalid && (
                          <StyledError>{error}</StyledError>
                        )}
                      </>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <StyledDelButton onClick={() => fields.remove(index)}>
                    Supprimer
                  </StyledDelButton>
                )}
              </MultiFieldRow>
            </RelativeDiv>
          ))}
          <AddButton
            onClick={() =>
              fields.push({
                type: TEMPS_PARTIEL,
                duration: null,
                salary: null,
              })
            }
          >
            Ajouter une période
          </AddButton>
        </>
      )
    }
  </FieldArray>
);

const { breakpoints, spacings } = theme;

const RelativeDiv = styled.div`
  position: relative;
`;

const RowTitle = styled.div`
  margin-bottom: ${spacings.base};
  padding-top: ${spacings.small};
`;

const StyledSelect = styled(Select)`
  display: flex;
`;

const FieldWrapper = styled.div`
  margin-right: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0;
    margin-bottom: ${spacings.base};
  }
`;

const StyledError = styled(Error)`
  margin-bottom: 0;
`;

const StyledDelButton = styled(DelButton)`
  margin-top: ${spacings.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0;
  }
`;
