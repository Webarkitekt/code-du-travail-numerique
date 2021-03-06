function getSemQuery({ query_vector, size, sources = [] }) {
  if (sources.length === 0) {
    throw new Error("[getSemQuery] sources should not be empty");
  }
  return {
    size: size,
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "url",
      "action",
      "breadcrumbs",
    ],
    query: {
      script_score: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  excludeFromSearch: false,
                },
              },
              {
                bool: {
                  should: sources.map((source) => ({ term: { source } })),
                },
              },
            ],
          },
        },
        script: {
          source: "cosineSimilarity(params.query_vector, 'title_vector') + 1.0",
          params: { query_vector: query_vector },
        },
      },
    },
  };
}

module.exports = getSemQuery;
