export default function TaskItem({ tache, onToggle, onSupprimer }) {
  return (
    <li className={`task-item ${tache.terminee ? 'terminee' : ''}`}>
      <input
        type="checkbox"
        checked={tache.terminee}
        onChange={() => onToggle(tache.id)}
      />
      <span className="task-text">{tache.texte}</span>
      {/* Utilisation d'une fonction fléchée pour éviter l'exécution au rendu */}
      <button className="btn-delete" onClick={() => onSupprimer(tache.id)}>
        ✕
      </button>
    </li>
  );
}