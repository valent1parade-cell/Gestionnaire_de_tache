import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Compteur from './components/Compteur';
import Filtres from './components/Filtres';
import './App.css';

const tachesInitiales = [
  { id: 1, texte: 'Réviser le chapitre 3', terminee: false },
  { id: 2, texte: 'Envoyer le rapport à M. Dubois', terminee: true },
  { id: 3, texte: 'Préparer la réunion de lundi', terminee: false },
];

export default function App() {
  const [taches, setTaches] = useState(tachesInitiales);
  const [filtre, setFiltre] = useState('toutes');

  // Question 8 : Ajout immuable (pas de .push)
  const ajouterTache = (texte) => {
    const nouvelleTache = {
      id: Date.now(),
      texte,
      terminee: false,
    };
    setTaches([...taches, nouvelleTache]);
  };

  // Question 10 : Basculer immuablement sans modifier l'objet d'origine
  const basculerTache = (id) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  };

  // Question 11 : Suppression d'une tâche
  const supprimerTache = (id) => {
    setTaches(taches.filter((tache) => tache.id !== id));
  };

  // Question 12 : Supprimer toutes les terminées
  const supprimerTerminees = () => {
    setTaches(taches.filter((tache) => !tache.terminee));
  };

  // Question 13 : Tout marquer comme fait
  const toutMarquerFait = () => {
    setTaches(taches.map((tache) => ({ ...tache, terminee: true })));
  };

  // Question 19 : Calcul dynamique de la liste filtrée sans useState
  const tachesFiltrees = taches.filter((tache) => {
    if (filtre === 'en-cours') return !tache.terminee;
    if (filtre === 'terminees') return tache.terminee;
    return true; // 'toutes'
  });

  return (
    <div className="app-container">
      <h1>Mes tâches</h1>

      <TaskForm onAjout={ajouterTache} />

      <TaskList
        taches={tachesFiltrees}
        onToggle={basculerTache}
        onSupprimer={supprimerTache}
      />

      <div className="actions-massives">
        <button onClick={toutMarquerFait}>Tout marquer comme fait</button>
        <button onClick={supprimerTerminees}>Supprimer les terminées</button>
      </div>

      <footer className="footer-bar">
        <Compteur taches={taches} />
        <Filtres filtreActif={filtre} onChangerFiltre={setFiltre} />
      </footer>
    </div>
  );
}