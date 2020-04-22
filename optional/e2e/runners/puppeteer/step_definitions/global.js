const { Soit, Quand, Alors } = require("./_fr");

const { I } = inject();

//

Soit("un utilisateur sur la page d'accueil", () => {
  I.amOnPage("/");
});

Soit("un utilisateur sur la page {string}", (page) => {
  I.amOnPage(`/${page}`);
});

//

Quand("je pause le test", () => {
  pause();
});

Quand("je recherche {string}", (searchText) => {
  I.fillField("q", searchText);
});

Quand("je renseigne {string} dans le champ {string}", async (text, input) => {
  I.resetInputFocus(input);
  I.fillField(input, text);
});

Quand("je clique sur {string}", async (text) => {
  I.click(text);
});

Quand("je choisis {string}", (text) => {
  I.checkOption(text);
});

Quand("je ferme la modale", () => {
  I.click('button[title="fermer la modale"]');
});

Quand("j'attends que les suggestions apparaissent", () => {
  I.waitForElement("//ul[@role='listbox']", 3);
});

Quand("j'attends que les résultats de recherche apparaissent", () => {
  I.waitForElement("[aria-label^='Résultats de recherche']", 3);
});

Quand("j'attends que le titre de page {string} apparaisse", (title) => {
  I.scrollPageToTop();
  I.waitForElement(`//h1[contains(., "${title}")]`, 5);
});

Quand("j'attend que le texte {string} apparaisse", (text) => {
  I.waitForText(text);
  I.scrollTo(`//*[text()[starts-with(., "${text}")]]`, 0, -100);
});

Quand("je scroll à {string}", (text) => {
  I.scrollTo(`//*[text()[starts-with(., "${text}")]]`, 0, -100);
});

//

Alors("je vois {string}", (text) => {
  I.see(text);
});

Alors("je ne vois pas {string}", (text) => {
  I.dontSee(text);
});

Alors("je vois le bouton {string}", (text) => {
  I.seeElement(`//button[text()="${text}"]`);
});

Alors("je vois que bouton {string} est désactivé", (text) => {
  I.seeElement(`//button[text()="${text}" and @disabled]`);
});

Alors("le lien {string} pointe sur {string}", (text, url) => {
  I.seeElement(
    `//a[starts-with(., "${text}") and contains(./@href, "${url}")]`
  );
});

Alors("je vois {string} fois le {string} {string}", (num, element, text) => {
  I.seeNumberOfVisibleElements(
    `//${element}[contains(., "${text}")]`,
    parseInt(num, 10)
  );
});

Alors("je vois {string} suggestions", (num) => {
  I.seeNumberOfVisibleElements("//ul[@role='listbox']//li", parseInt(num, 10));
});

Alors("je vois {string} tuiles sous le texte {string}", (num, title) => {
  const target = `following-sibling::*//li//a`;
  const textMatcher = `text()[starts-with(., "${title}")]`;
  I.seeNumberOfVisibleElements(
    `//header[*[${textMatcher}]]/${target} | //div/*[${textMatcher}]/${target}`,
    parseInt(num, 10)
  );
});
