import { Client } from "@elastic/elasticsearch";
import { documentMapping } from "./document.mapping";
import { DOCUMENTS, SUGGESTIONS } from "./esIndexName";
import {
  createIndex,
  deleteOldIndex,
  indexDocumentsBatched,
  version,
} from "./es_client.utils";
import { logger } from "./logger";
import { populateSuggestions } from "./suggestion";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

const DOCUMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const SUGGEST_INDEX_NAME = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const DUMP_PATH = process.env.DUMP_PATH || "../dist/dump.data.json";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const esClientConfig = {
  node: `${ELASTICSEARCH_URL}`,
};

switch (process.env.NODE_ENV) {
  case "production":
    esClientConfig.auth = {
      username: process.env.ELASTICSEARCH_USER || "elastic",
      password: process.env.ELASTICSEARCH_PWD,
    };
    break;
}

const client = new Client(esClientConfig);

async function main() {
  const ts = Date.now();
  await version({ client });

  // Indexing documents/search data
  await createIndex({
    client,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    mappings: documentMapping,
  });
  const documents = require(DUMP_PATH);
  await indexDocumentsBatched({
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    client,
    documents,
  });

  // Indexing Suggestions
  await populateSuggestions(client, `${SUGGEST_INDEX_NAME}-${ts}`);

  // Creating aliases
  await client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            index: `${DOCUMENT_INDEX_NAME}-*`,
            alias: `${DOCUMENT_INDEX_NAME}`,
          },
        },
        {
          remove: {
            index: `${SUGGEST_INDEX_NAME}-*`,
            alias: `${SUGGEST_INDEX_NAME}`,
          },
        },

        {
          add: {
            index: `${DOCUMENT_INDEX_NAME}-${ts}`,
            alias: `${DOCUMENT_INDEX_NAME}`,
          },
        },
        {
          add: {
            index: `${SUGGEST_INDEX_NAME}-${ts}`,
            alias: `${SUGGEST_INDEX_NAME}`,
          },
        },
      ],
    },
  });

  const patterns = [DOCUMENT_INDEX_NAME, SUGGEST_INDEX_NAME];

  await deleteOldIndex({ client, patterns, timestamp: ts });
}

main().catch((response) => {
  if (response.body) {
    logger.error(response.meta.statusCode);
    logger.error(response.name);
    logger.error(response.meta.meta.request);
  } else {
    logger.error(response);
  }
  process.exit(-1);
});
