import React from "react";

function StepIntro() {
  return (
    <>
      <p>
        Ce simulateur vous permet de savoir si le salarié peut bénéficier
        d’heures pour rechercher un emploi pendant son préavis.
      </p>
      <p>
        Le code du travail ne prévoit pas ce droit, sauf cas particuliers. En
        revanche, la majorité des conventions collectives fixe un nombre
        d’heures d’absences pour rechercher un emploi et les modalités
        d’utilisation.
      </p>
      <p>
        Afin de réaliser cette simulation, vous aurez besoin d’informations
        concernant la situation du salarié concerné, comme sa convention
        collective, sa catégorie, son ancienneté. La plupart de ces informations
        se trouvent sur le contrat de travail ou le bulletin de salaire.
        Prévoyez deux à cinq minutes pour cette simulation.
      </p>
      <p>Cliquez sur suivant pour commencer la simulation.</p>
    </>
  );
}

export { StepIntro };
