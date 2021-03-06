import getQueryType from "../getQueryType";

test.each`
  query                   | expected
  ${`carrefour paris`}    | ${`text`}
  ${`airbus`}             | ${`text`}
  ${`148`}                | ${`idcc`}
  ${`1486`}               | ${`idcc`}
  ${`14861486977779`}     | ${`siret`}
  ${` 821 980 877 00020`} | ${`siret`}
`("returns $expected when $query", ({ query, expected }) => {
  expect(getQueryType(query)).toBe(expected);
});
