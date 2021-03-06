import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import { Container, icons, theme } from "@socialgouv/react-ui";

import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

export const HEADER_HEIGHT = "8.6rem";
export const MOBILE_HEADER_HEIGHT = "6.6rem";

const { Search: SearchIcon } = icons;

const printDate = () => {
  const currentDate = new Date(Date.now()).toLocaleString("fr-FR");
  return `le ${currentDate.slice(0, 10)} à ${currentDate.slice(11, 18)}`;
};

export const Header = ({ currentPage = "" }) => {
  const [currentDate, setDate] = useState();
  useEffect(() => {
    setDate(printDate());
  }, []);
  const router = useRouter();
  return (
    <StyledHeader currentPage={currentPage}>
      <StyledPrintDate id="printDate">{currentDate}</StyledPrintDate>
      <StyledContainer>
        <Link href="/" passHref>
          <LogoLink title="Code du travail numérique - retour à l'accueil">
            <Marianne
              src={"/static/assets/img/marianne.svg"}
              alt="symbole de la Marianne, site officiel du gouvernement | Ministère du travail"
            />
            <Logo />
          </LogoLink>
        </Link>
        <RightSide>
          <BurgerNav currentPage={currentPage} />
          {currentPage !== "home" && currentPage !== "search" && (
            <>
              <Link
                href={{ pathname: "/recherche", query: router.query }}
                passHref
              >
                <StyledLink>
                  <SearchIcon />
                </StyledLink>
              </Link>
              <SearchBarWrapper>
                <SearchBar />
              </SearchBarWrapper>
            </>
          )}
        </RightSide>
      </StyledContainer>
    </StyledHeader>
  );
};

const { breakpoints, spacings } = theme;

const StyledHeader = styled.header`
  ${({ currentPage }) => {
    if (currentPage !== "home") {
      return css`
        position: sticky;
        top: 0;
        z-index: 3;
      `;
    }
  }};
  height: ${HEADER_HEIGHT};
  background-color: ${({ currentPage, theme }) =>
    currentPage === "home" ? "transparent" : theme.white};
  @media (max-width: ${breakpoints.mobile}) {
    height: ${MOBILE_HEADER_HEIGHT};
  }
  @media print {
    position: relative;
    box-shadow: none;
  }
`;

const StyledPrintDate = styled.div`
  display: none;
  text-align: right;
  @media print {
    display: block;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  margin: ${spacings.xsmall} 0;
  text-decoration: none;
  @media (max-width: ${breakpoints.mobile}) {
    /* 6.2rem is half logo's width so it gets centered */
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: space-between;
    width: calc(50% + 6.2rem);
  }
`;

const Marianne = styled.img`
  width: 7rem;
  height: 7rem;
  margin-right: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 5rem;
    width: 5rem;
    height: 5rem;
  }
`;
const Logo = styled(icons.Logo)`
  width: 17rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 12.4rem;
    width: 12.4rem;
    height: 5rem;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-end;
  @media print {
    display: none;
  }
`;

const StyledLink = styled.a`
  display: none;
  order: 1;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    width: 3.4rem;
    height: 3.4rem;
    margin-left: ${spacings.medium};
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 2.2rem;
    height: 2.2rem;
    margin-left: ${spacings.small};
  }
`;

const SearchBarWrapper = styled.div`
  order: 3;
  width: 31rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
