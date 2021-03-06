const request = require("supertest");
const Koa = require("koa");
const fetch = require("node-fetch");
const winston = require("winston");
const { SOURCES } = require("@cdt/sources");
const router = require("../search");

const getSearchBody = require("../search/search.elastic");
const getSemBody = require("../search/search.sem");
const getDocumentByUrlQuery = require("../search/getDocumentByUrlQuery");
const demission_vector = require("./demission.vector");
const r1225_18_vector = require("./r1225-18.vector");

const { logger } = require("../../utils/logger");
logger.level = winston.error;

// mock fetch function to return vector for démission
jest.mock("node-fetch");
fetch.mockImplementation((req) => {
  let data = r1225_18_vector;
  if (/démission/.test(decodeURIComponent(req))) {
    data = demission_vector;
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
});

const app = new Koa();
app.use(router.routes());

it("asks same sources wether it is search sem or search elastic and gets a description", () => {
  const searchBody = getSearchBody({ sources: [SOURCES.CDT] });
  const semBody = getSemBody({ sources: [SOURCES.CDT] });
  const getEsRefBody = getDocumentByUrlQuery("/code-du-travail/slug");
  expect(searchBody._source).toEqual(semBody._source);
  expect(getEsRefBody._source).toEqual(semBody._source);
  expect(searchBody._source).toContain("description");
});

it("returns search results for demission from datafiller", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot(); // datafiller is involved here (no ES or Sem)
});

it("returns 3 search results for demission from elastic if size = 3", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults&size=3"
  );
  expect(response.status).toBe(200);
  expect(response.body.documents.length).toBe(3);
});

it("returns search results for demission from elastic", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

it("returns article results when searching article R1225-18", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/search?q=r1225-18`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
