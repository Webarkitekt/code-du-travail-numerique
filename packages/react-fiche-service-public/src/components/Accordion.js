import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Accordion, theme } from "@socialgouv/react-ui";

import { getText } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";

const { spacings } = theme;

const isItemOfAccordion = (element) =>
  (element.name === "Chapitre" || element.name === "Cas") &&
  element.children.find((child) => child.name === "Titre");

class AccordionWrapper extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired,
  };
  render() {
    const { data, headingLevel } = this.props;
    const firstIndexOfAccordionItem = data.children.findIndex(
      isItemOfAccordion
    );
    const accordionItems = data.children
      .filter(isItemOfAccordion)
      .map((accordionItem) => {
        const title = (
          <Title level={headingLevel}>
            {getText(
              accordionItem.children.find((child) => child.name === "Titre")
            )}
          </Title>
        );
        const body = (
          <ElementBuilder
            data={accordionItem.children.filter(
              (child) => child.name !== "Titre"
            )}
            headingLevel={headingLevel + 1}
          />
        );
        return {
          title,
          body,
        };
      });

    const beforeAccordionElements = data.children
      .slice(0, firstIndexOfAccordionItem)
      .map((element, index) => (
        <ElementBuilder
          key={index}
          data={element}
          headingLevel={headingLevel}
        />
      ));

    const afterAccordionElements = data.children
      .slice(firstIndexOfAccordionItem + accordionItems.length)
      .map((element, index) => (
        <ElementBuilder
          key={index}
          data={element}
          headingLevel={headingLevel}
        />
      ));
    return (
      <>
        {beforeAccordionElements}
        {accordionItems.length > 0 && (
          <StyledAccordion items={accordionItems} />
        )}
        {afterAccordionElements}
      </>
    );
  }
}

export default AccordionWrapper;

const StyledAccordion = styled(Accordion)`
  margin-bottom: ${spacings.large};
`;
