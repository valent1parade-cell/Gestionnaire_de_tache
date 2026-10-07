import { useState } from 'react';

export default function TaskForm({ onAjout }) {
  const [texte, setTexte] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Refuse les chaînes vides ou composées uniquement d'espaces
    if (texte.trim() === '') return;

    onAjout(texte.trim());
    setTexte(''); // Réinitialise le champ
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Nouvelle tâche…"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}