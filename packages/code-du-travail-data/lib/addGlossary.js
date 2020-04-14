const glossary = require("../dataset/datafiller/glossary.data.json");

function execOne(htmlContent, { abbrs, title, definition, variants }) {
  let htmlFormat = htmlContent;
  if (!htmlContent) return htmlFormat;

  const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
  const wordBoundaryStart = `(?:^|[^_/\\w${frDiacritics}-])`;
  const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;
  const patterns = [...new Set([title, ...variants])]
    .map(
      (term) =>
        new RegExp(`${wordBoundaryStart}(${term})${wordBoundaryEnd}`, "gi")
    )
    .concat(abbrs.map((abbr) => new RegExp(`\\b(${abbr})\\b`, "g")));

  patterns.forEach((pattern) => {
    htmlFormat = htmlContent.replace(pattern, function (_, term) {
      return _.replace(
        new RegExp(term),
        `<webcomponent-tooltip content="${definition}">${term}</webcomponent-tooltip>`
      );
    });
  });
  return htmlFormat;
}

function addGlossary(htmlContent) {
  return glossary.reduce((updatedContent, match) => {
    return execOne(updatedContent, match);
  }, htmlContent);
}

module.exports = addGlossary;
