import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Button, theme, Tile } from "@socialgouv/react-ui/";

export const CallToActionTile = React.forwardRef(
  ({ action, children, ...props }, ref) => (
    <Tile custom {...props} ref={ref}>
      <TileChildren>
        {children}
        <StyledDiv hasContentAbove={Boolean(children)}>
          <Button variant="link" as="div">
            {action}
          </Button>
        </StyledDiv>
      </TileChildren>
    </Tile>
  )
);

CallToActionTile.displayName = "CallToActionTile";

CallToActionTile.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node,
};

CallToActionTile.defaultProps = {
  action: "",
  children: null,
};

const { spacings } = theme;

const TileChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledDiv = styled.div`
  margin-top: ${({ hasContentAbove }) =>
    hasContentAbove ? spacings.base : spacings.small};
`;
