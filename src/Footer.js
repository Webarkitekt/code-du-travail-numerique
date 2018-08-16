import React from "react";

import { Link } from "../routes";

const Footer = () => (
  <footer className="section-dark" id="footer">
    <div className="container">
      <div className="main-footer">
        <div className="footer__block">
          <h3>Code du travail numérique</h3>
          <ul>
            <li>
              <a href="/">Qui sommes-nous ?</a>
            </li>
            <li>
              <a href="/">Mentions légales</a>
            </li>
          </ul>
        </div>
        <div className="footer__block">
          <h3>Aidez-nous à améliorer cet outil</h3>
          <ul>
            <li>
              <a href="/">Vous avez identifié une erreur ?</a>
            </li>
            <li>
              <a
                href="https://github.com/SocialGouv/code-du-travail-html/"
                className="external-link__after"
              >
                Contribuer sur Github
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__block">
          <h3>Liens et outils</h3>
          <ul>
            <li>
              <a
                href="https://socialgouv.github.io/faq-code-du-travail"
                className="external-link__after"
              >
                Question-Réponse des services de renseignement
              </a>
            </li>
            <li>
              <a href="/">Trouvez votre convention collective</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;