import { parseIdcc } from "@cdt/data";

import getQueryType from "./getQueryType";
import { searchConvention } from "./convention.service";
import {
  searchEntrepriseByName,
  searchEntrepriseBySiret,
} from "./entreprise.service";

// build a result list based on query type
export const getResults = async (query) => {
  const trimmedQuery = query.trim();
  const type = getQueryType(query);

  let conventions = [];
  let entreprises = [];

  if (type === "text") {
    [conventions, entreprises] = await Promise.all([
      searchConvention(trimmedQuery),
      searchEntrepriseByName(trimmedQuery).then((entreprises) =>
        entreprises.filter(
          (entreprise) =>
            entreprise.conventions && entreprise.conventions.length
        )
      ),
    ]);
  } else if (type === "siret") {
    entreprises = await searchEntrepriseBySiret(query.replace(/[\s .-]/g, ""));
  } else if (type === "idcc") {
    const matches = await searchConvention(parseIdcc(trimmedQuery));

    if (matches && matches.length) {
      const perfectMatch = matches.find(
        (match) => parseIdcc(match.num) === parseIdcc(trimmedQuery)
      );
      conventions = perfectMatch ? [perfectMatch] : matches.slice(0, 5);
    }
  } else {
    return null;
  }
  return {
    conventions,
    entreprises,
  };
};
