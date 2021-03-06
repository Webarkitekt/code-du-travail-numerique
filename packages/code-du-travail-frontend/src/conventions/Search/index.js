import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import Spinner from "react-svg-spinner";

import { Input, Label, theme } from "@socialgouv/react-ui";

import { matopush } from "../../piwik";
import useSearchCC from "./searchHook";
import { ResultList } from "./ResultList";
import { CompanyTile } from "./CompanyTile";
import { ConventionLink } from "./ConventionLink";

const Search = ({ onSelectConvention }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onInputChange = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  const [status, { conventions = [], entreprises = [] } = {}] = useSearchCC(
    query
  );

  useEffect(() => {
    if (status === "success" && query.length > 1) {
      matopush(["trackEvent", "cc_search", router.asPath, query]);
    }
    if (status === "empty" && query.length > 1) {
      matopush(["trackEvent", "cc_search_empty", router.asPath, query]);
    }
  }, [query, router.asPath, status]);

  return (
    <>
      <Label htmlFor="convention-search">
        Renseignez le nom de votre entreprise, son SIRET ou le nom de votre
        convention collective.
      </Label>
      <BlockInput
        role="search"
        placeholder="Nom d'entreprise, SIRET, nom de convention collective"
        value={query}
        type="search"
        name="q"
        id="convention-search"
        onChange={onInputChange}
      />
      {query && (
        <ResultsContainer>
          {status === "loading" && (
            <div>
              <Spinner /> Recherche des convention collectives...
            </div>
          )}
          {status === "error" && (
            <div>Le service de recherche est indisponible.</div>
          )}
          {status === "empty" && <div>Aucun résultat n’a été trouvé.</div>}
          {status === "success" && (
            <>
              {conventions.length !== 0 && (
                <ResultList
                  buttonLabel={"Voir plus de conventions collectives "}
                  title="CONVENTIONS COLLECTIVES"
                  query={query}
                  items={conventions.map((convention, index) => (
                    <ConventionLink
                      convention={convention}
                      isFirst={index === 0}
                      key={convention.slug}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
              {entreprises.length !== 0 && (
                <ResultList
                  buttonLabel={"Voir plus d’entreprises"}
                  title="ENTREPRISES"
                  query={query}
                  items={entreprises.map((entreprise) => (
                    <CompanyTile
                      {...entreprise}
                      key={entreprise.siret}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
            </>
          )}
        </ResultsContainer>
      )}
    </>
  );
};

const { spacings } = theme;
const BlockInput = styled(Input)`
  width: 100%;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

export default Search;
