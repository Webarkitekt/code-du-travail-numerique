import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import { ErrorBoundary } from "../../../common/ErrorBoundary";

const MathFormula = dynamic(() => import("../../common/MathFormula"));

function FormulaDetails({ infoCalcul: { labels, formula } }) {
  return (
    <Details>
      <Summary>Voir le détail du calcul</Summary>
      <HeadingDetails>Éléments saisis :</HeadingDetails>
      <ListDetails>
        {Object.entries(labels).map(([label, value], index) => (
          <ItemDetails key={index}>
            {label}&nbsp;: {value}
          </ItemDetails>
        ))}
      </ListDetails>
      <ErrorBoundary>
        <HeadingDetails>Formule :</HeadingDetails>
        <FormuleWrapper>
          <MathFormula>{formula}</MathFormula>
        </FormuleWrapper>
      </ErrorBoundary>
    </Details>
  );
}

export { FormulaDetails };

FormulaDetails.propTypes = {
  infoCalcul: PropTypes.shape({
    labels: PropTypes.object.isRequired,
    formula: PropTypes.string.isRequired,
  }),
};

const { spacings, fonts } = theme;

export const Summary = styled.summary`
  display: block;
  margin-bottom: ${spacings.base};
`;

const Details = styled.details`
  margin-top: ${spacings.medium};
`;

const HeadingDetails = styled.strong`
  font-weight: bold;
  font-size: ${fonts.sizes.small};
`;

const ListDetails = styled.ul`
  list-style-type: disc;
`;

const ItemDetails = styled.li`
  font-size: ${fonts.sizes.small};
`;

const FormuleWrapper = styled.div`
  margin: ${spacings.base} 0;
`;
