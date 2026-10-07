export default function Compteur({ taches }) {
  /*
   EXPLICATION QUESTION 16 :
   Pourquoi pas un useState ici ?
   Le nombre de tâches restantes est une donnée dérivée directement du tableau `taches`.
   Créer un state dédié doublerait la source de vérité et risquerait de provoquer
   des désynchronisations lors des ajouts, suppressions ou filtrages.
  */
  const restantes = taches.filter((tache) => !tache.terminee).length;

  let texteAffiche = '';
  if (restantes === 0) {
    texteAffiche = 'Tout est fait';
  } else if (restantes === 1) {
    texteAffiche = '1 tâche restante';
  } else {
    texteAffiche = `${restantes} tâches restantes`;
  }

  return <span className="compteur">{texteAffiche}</span>;
}