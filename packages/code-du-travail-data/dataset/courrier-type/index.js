const mammoth = require("mammoth");
const fs = require("fs");
const data = require("./courriers.json");
const { SOURCES, getRouteBySource } = require("@cdt/sources");
const slugify = require("../../slugify");
const allThemes = require("@socialgouv/datafiller-data/data/themes.json");
const { createThemer } = require("../../indexing/breadcrumbs");

const getBreadcrumbs = createThemer(allThemes);

const DOC_DIR = "docx";

const basic_styles = `<style>
.courrier-expediteur {display: flex; align-items: flex-start; flex-direction:column;}
.courrier-destinataire {display: flex; align-items: flex-end; flex-direction:column;}
.courrier-signature {display: flex; flex-direction:column; align-items: flex-end;}
.title-center {display: flex; align-items: center; flex-direction:column; font-size: 1.8rem; font-weight:bold}
.center {display: flex; align-items: center; flex-direction:column; }
.checklist { list-style-image: url(data:image/svg+xml;,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221rem%22%20height%3D%221rem%22%20viewBox%3D%220%200%2011%2011%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M2%202h10v10H2z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20stroke%3D%22currentColor%22%20stroke-width%3D%22.5%22%20d%3D%22M1%201h9v9H1z%22%2F%3E%3C%2Fsvg%3E);}
.editable {color: #4d73b8}
</style>`;

const options = {
  styleMap: [
    "p[style-name='signature'] => div.courrier-signature > p:fresh",
    "p[style-name='choix'] => li.checklist:fresh",
    "p[style-name='centre'] => div.center > p:fresh",
    "p[style-name='Titre-centre'] => div.title-center:fresh",
    "p[style-name='expediteur'] => div.courrier-expediteur > p:fresh",
    "p[style-name='destinataire'] => div.courrier-destinataire > p:fresh",
    "p[style-name='Titre'] => h3.courrier-titre:fresh",
  ],
};

const convertFile2Html = ({ filename, title, description, ...rest }) => {
  return mammoth
    .convertToHtml(
      {
        path: `${__dirname}/${DOC_DIR}/${filename}`,
      },
      options
    )
    .then((result) => {
      const slug = slugify(title);
      return {
        filename,
        breadcrumbs: getBreadcrumbs(
          `/${getRouteBySource(SOURCES.LETTERS)}/${slug}`
        ),
        source: SOURCES.LETTERS,
        slug,
        filesize: fs.statSync(`${__dirname}/${DOC_DIR}/${filename}`).size,
        title,
        text: description,
        description,
        ...rest,
        excludeFromSearch: false,
        html:
          basic_styles +
          result.value
            .replace(/\t/g, " ")
            .replace(/(«[^»]+»)/g, "<span class='editable'>$1</span>"),
      };
    })
    .catch((err) => {
      console.error(`Error while converting ${filename}`, err);
    });
};

const getCourriers = () => Promise.all(data.map(convertFile2Html));

module.exports = { getCourriers };
