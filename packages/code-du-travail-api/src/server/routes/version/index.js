const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getVersionsBody = require("./versions.elastic");
const memoizee = require("memoizee");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const router = new Router({ prefix: API_BASE_URL });

async function _getVersionsBody() {
  const body = getVersionsBody();

  const response = await elasticsearchClient.search({ index, body });
  return response;
}
const getVersions = memoizee(_getVersionsBody, {
  promise: true,
  maxAge: 1000 * 5 * 60,
  preFetch: true,
});

/**
 * Return the API version
 *
 * @example
 * http://localhost:1337/api/v1/version
 *
 * @returns {string} The current api version.
 */
router.get("/version", async (ctx) => {
  const version =
    process.env.VERSION || require("../../../../package.json").version;

  const response = await getVersions();
  const { data } = response.body.hits.hits[0]._source;
  ctx.body = { version, data };
});

module.exports = router;
