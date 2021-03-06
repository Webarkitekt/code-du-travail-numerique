const Router = require("koa-router");
const { DOCUMENTS, MT_SHEETS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getItemBySlugBody = require("./searchBySourceSlug.elastic");
const getDocumentByUrlBody = require("./searchByUrl.elastic");
const { getRelatedItems } = require("./getRelatedItems");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
let index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return document matching the given source+slug.
 *
 * @example
 * http://localhost:1337/api/v1/items/:source/:slug
 *
 * @param {string} :source The item source.
 * @param {string} :slug The item slug to fetch.
 * @returns {Object} Result.
 */
router.get("/items/:source/:slug", async (ctx) => {
  const { source, slug } = ctx.params;
  const body = getItemBySlugBody({ source, slug });
  const response = await elasticsearchClient.search({ index, body });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no documents that match ${slug} in ${source}`);
  }

  const item = response.body.hits.hits[0];

  const {
    _id,
    _source: { title },
  } = item;

  const relatedItems = await getRelatedItems({
    slug,
    title,
    settings: [{ _id }],
  });
  delete item._source.title_vector;
  ctx.body = {
    ...item,
    relatedItems,
  };
});

/**
 * Return document matching the given id.
 *
 * @example
 * http://localhost:1337/api/v1/items/:id
 *
 * @param {string} :id The item id.
 * @returns {Object} Result.
 */
router.get("/items/:id", async (ctx) => {
  const { id } = ctx.params;

  const response = await elasticsearchClient.get({
    index: index,
    type: "_doc",
    id,
  });
  delete response.body._source.title_vector;
  ctx.body = { ...response.body };
});

/**
 * Return document matching the given url.
 *
 * @example
 * http://localhost:1337/api/v1/items?url=:url
 *
 * @param {string} :url The item url.
 * @returns {Object} Result.
 */
router.get("/items", async (ctx) => {
  const { url } = ctx.query;
  const body = getDocumentByUrlBody({ url });
  // for travail-gouv url we need to search in MT_SHEET index since
  // there is no URL in fiche_mt_split.json
  if (url.match(/travail-emploi.gouv/)) {
    index = `${ES_INDEX_PREFIX}_${MT_SHEETS}`;
  }
  const response = await elasticsearchClient.search({ index, body });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no document that match ${url}`);
  }

  const [item] = response.body.hits.hits;
  delete item.title_vector;
  ctx.body = { ...item };
});

module.exports = router;
