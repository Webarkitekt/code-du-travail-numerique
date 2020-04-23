const glossary = require("@socialgouv/datafiller-data/data/glossary.json");

export function addGlossary(htmlContent) {
  const internalRefMap = new Map();
  const formatedContent = glossary.reduce((updatedContent, match) => {
    const { abbrs, title, definition, variants } = match;
    if (!updatedContent) return updatedContent;
    // we cannot use \b word boundary since \w does not match diacritics
    // So we do a kind of \b equivalent.
    // the main différence is that matched pattern can include a whitespace as first char
    const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
    const wordBoundaryStart = `(?:^|[^_/\\w${frDiacritics}-])`;
    const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;
    const patterns = [...new Set([title, ...variants])].map(
      (term) =>
        new RegExp(`${wordBoundaryStart}(${term})${wordBoundaryEnd}`, "gi")
    );
    if (abbrs) {
      patterns.concat(new RegExp(`\\b(${abbrs})\\b`, "g"));
    }

    const formatedContent = Array.from(patterns).reduce((content, pattern) => {
      return content.replace(pattern, function (_, term) {
        // we use an internal ref id to track pattern replacement
        const ref = "__tt__" + Math.random().toString(36).substr(2, 9);
        internalRefMap.set(
          ref,
          `<webcomponent-tooltip content="${definition}">${term}</webcomponent-tooltip>`
        );
        return _.replace(new RegExp(term), ref);
      });
    }, updatedContent);
    return formatedContent;
  }, htmlContent);

  // console.log("CONSOLE LOG: addGlossary -> formatedContent", formatedContent);
  // we get ref id to replace pattern
  const finalContent = Array.from(internalRefMap).reduce((content, match) => {
    const [key, value] = match;
    return content.replace(new RegExp(key, "g"), value);
  }, formatedContent);

  return finalContent;
}
