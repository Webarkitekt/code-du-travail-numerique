import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Container, icons, OverflowWrapper, theme } from "@socialgouv/react-ui";

const { ArrowRight, Home: HomeIcon } = icons;

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Nav>
      <OverflowWrapper>
        <StyledContainer>
          {[
            <NavItem key="home">
              <Link href="/" passHref>
                <StyledLink title="Retour à l'accueil">
                  <StyledHomeIcon />
                  Accueil
                </StyledLink>
              </Link>
            </NavItem>,
            ...items.map(({ label, slug }) => (
              <NavItem key={`${slug}`}>
                <StyledArrowRight />{" "}
                <Link key={slug} href={getLinkHref(slug)} as={slug} passHref>
                  <StyledLink>{label}</StyledLink>
                </Link>
              </NavItem>
            )),
          ]}
        </StyledContainer>
      </OverflowWrapper>
    </Nav>
  );
};

function getLinkHref(slug) {
  const subPageMatcher = new RegExp("/[^/]+/.+$");
  return subPageMatcher.test(slug) ? slug.replace(/\/[^/]+$/, "/[slug]") : slug;
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export { Breadcrumbs };

const { breakpoints, fonts, spacings } = theme;

const Nav = styled.nav`
  margin-bottom: ${spacings.small};
`;
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacings.small} 0 0;
  white-space: nowrap;
  &:first-of-type {
    padding-left: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.tiny};
    &:not(:last-of-type) {
      display: none;
    }
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  &:focus,
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const StyledHomeIcon = styled(HomeIcon)`
  width: 2rem;
  height: 2rem;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

const StyledArrowRight = styled(ArrowRight)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.mobile}) {
    transform: rotate(180deg);
  }
`;
