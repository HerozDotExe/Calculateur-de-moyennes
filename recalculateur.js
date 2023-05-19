function log() {
  const args = Array.from(arguments);
  console.log(
    "[Calculateur de moyennes]: " +
      args.reduce(function (a, b) {
        return a + b;
      })
  );
}

function formaterNote(n) {
  let note = n.toFixed(2);
  if (note.charAt(note.length - 1) === "0") {
    note = note.slice(0, note.length - 1);
    if (note.charAt(note.length - 1) === "0") {
      note = note.slice(0, note.length - 2);
    }
  }

  return note;
}

let éDDMAJModifié = false;
let éDLMGModifié = false;
function calculDesNotesDunePeriode(periode) {
  //Petites modifs de la page
  const élémentsDeLaLégende = document.querySelector(
    "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
      periode +
      ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes div.bloc-legende.clear.d-print-none.row.ng-star-inserted div.col-lg-6.ng-star-inserted table tbody"
  );
  if (
    élémentsDeLaLégende !== null &&
    document.querySelector("#légende") === null
  ) {
    élémentsDeLaLégende.innerHTML =
      élémentsDeLaLégende.innerHTML +
      `<tr><td id="conteneurLégende"> <p id="légende">note</p> </td><td>Note recalculée</td></tr>`;
    log("Légende insérée.");
  }

  const élémentDeDernièreMiseAJour = document.querySelector(
    "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
      periode +
      ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.tab-pane.ng-star-inserted.active ed-eleve-evaluations.ng-star-inserted div#encart-notes p.form-text.ng-star-inserted"
  );
  if (élémentDeDernièreMiseAJour !== null && !éDDMAJModifié) {
    élémentDeDernièreMiseAJour.childNodes[1].textContent =
      " - L'extension de recalcul des notes a néanmoins recalculé vos moyennes.";
    éDDMAJModifié = true;
  }

  const élémentDeLaMoyenneGénérale = document.querySelector(
    "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
      periode +
      ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes table.table.releve.ed-table tbody tr.ng-star-inserted td.moyennegenerale-valeur"
  );

  if (élémentDeLaMoyenneGénérale !== null && !éDLMGModifié) {
    élémentDeLaMoyenneGénérale.addEventListener("click", function () {
      contenuDuTableauDesNotes = "";
    });
  }

  //Le calcul
  const matières = document.querySelectorAll(
    "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
      periode +
      ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes table.table.releve.ed-table tbody tr.ng-star-inserted"
  );

  if (matières.length !== 0) {
    tableauDesNotes = document.querySelector(
      "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
        periode +
        ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes table.table.releve.ed-table"
    );

    if (contenuDuTableauDesNotes !== tableauDesNotes.textContent) {
      log("Récupération des notes...");
      matières.forEach((e) => {
        if (e.cells[2]) {
          const nomDeLaMatière = e.cells[0].children[0].textContent;
          const élémentDeLaMoyenne = e.cells[1].querySelector("span");
          const élémentsDesNotes = e.cells[2];

          if (élémentsDesNotes.children.length !== 0) {
            log("Calcul des notes en ", nomDeLaMatière);
            let nouvelleMoyenne;
            const notes = [];
            const coeficients = [];

            élémentsDesNotes
              .querySelectorAll(
                "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
                  periode +
                  ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes table.table.releve.ed-table tbody tr.ng-star-inserted td.notes button.btn.text-normal.note.margin-whitespace.no-background.no-padding.ng-star-inserted span.valeur.ng-star-inserted"
              )
              .forEach((e) => {
                if (e.parentNode.childNodes[0].textContent != "(") {
                  const numérateur = parseFloat(
                    e.childNodes[0].textContent.replace(",", ".")
                  );

                  const dénominateur =
                    e.childNodes[1].className === "quotien ng-star-inserted"
                      ? parseFloat(
                          e.childNodes[1].textContent
                            .slice(2, e.childNodes[1].textContent.length)
                            .replace(",", ".")
                        )
                      : 20;
                  let coeficient =
                    e.childNodes[2].className === "coef ng-star-inserted"
                      ? parseFloat(
                          e.childNodes[2].textContent
                            .replace("(", "")
                            .replace(")", "")
                        )
                      : 1;
                  if (coeficient === 1 && e.childNodes[3]) {
                    coeficient =
                      e.childNodes[3].className === "coef ng-star-inserted"
                        ? parseFloat(
                            e.childNodes[3].textContent
                              .replace("(", "")
                              .replace(")", "")
                          )
                        : 1;
                  }

                  const noteSur20 = (numérateur / dénominateur) * 20;
                  notes.push(noteSur20 * coeficient);
                  coeficients.push(coeficient);
                  // console.log(numérateur, "/", dénominateur, "=>", noteSur20);
                }
              });

            if (notes.length !== 0) {
              const notesFinales = notes.reduce(function (a, b) {
                return a + b;
              });
              const coeficientsFinaux = coeficients.reduce(function (a, b) {
                return a + b;
              });

              // console.log(notesFinales, coeficientsFinaux)
              nouvelleMoyenne = notesFinales / coeficientsFinaux;
            }

            élémentDeLaMoyenne.innerHTML =
              `
          <abbr class="recalculé" title="Moyenne avant recalcul : ` +
              élémentDeLaMoyenne.textContent
                .replaceAll(" ", "")
                .replaceAll("\n", "") +
              `">` +
              formaterNote(nouvelleMoyenne) +
              `</abbr>
        `;
          } else {
            log(
              nomDeLaMatière,
              " ne sera pas recalculé, aucune notes trouvés."
            );
          }
        }
      });

      let moyenneGénérale;

      const élémentsContenantLesMoyennes = document.querySelectorAll(
        "html body app-root div.container-principal ed-authenticated-layout div#main-part div#main ed-eleve-note-lazy-template ed-eleve-notes-template div.double-padding.eleve-note.ed-container div.tab-content.main-container.double-padding.container-bg.ng-star-inserted div#periode" +
          periode +
          ".fade.show.active.ng-star-inserted ed-une-periode.ng-star-inserted div tabset#unePeriode.margin-bottom-10.margin-top-10.nav.nav-tabs-container-bg.flex-column.tab-container div.tab-content tab.active.tab-pane.ng-star-inserted ed-eleve-evaluations.ng-star-inserted div#encart-notes table.table.releve.ed-table tbody tr.ng-star-inserted td.relevemoyenne.ng-star-inserted span.ng-star-inserted"
      );

      let moyennes = [];
      élémentsContenantLesMoyennes.forEach((e) => {
        const valeur = parseFloat(e.textContent.replace(",", "."));
        if (!isNaN(valeur)) moyennes.push(valeur);
      });

      log("Recalcul de la moyenne générale...");

      moyenneGénérale =
        moyennes.reduce(function (a, b) {
          return a + b;
        }) / moyennes.length;
      élémentDeLaMoyenneGénérale.innerHTML =
        `
          <abbr class="recalculé" title="` +
        élémentDeLaMoyenneGénérale.textContent
          .replaceAll(" ", "")
          .replaceAll("\n", "") +
        `">` +
        formaterNote(moyenneGénérale) +
        `</abbr>
        `;

      contenuDuTableauDesNotes = tableauDesNotes.textContent;

      log("------Terminé------");
      console.dir(formaterNote(moyenneGénérale));
    }
  }
}

log("En attente du chargement de la page...");

let tableauDesNotes;
let contenuDuTableauDesNotes;

function calculDesNotes() {
  const nombreDePériodes = document.querySelectorAll(".nav-tabs li").length
  for (let index = 0; index < nombreDePériodes + 1; ) {
    calculDesNotesDunePeriode(index);
    index++;
  }
}

setInterval(calculDesNotes, 500);
