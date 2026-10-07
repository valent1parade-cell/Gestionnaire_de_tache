import TaskItem from './TaskItem';

export default function TaskList({ taches, onToggle, onSupprimer }) {
  // Question 20 : Si aucune tâche ne correspond au filtre
  if (taches.length === 0) {
    return <p className="empty-message">Aucune tâche</p>;
  }

  return (
    <ul className="task-list">
      {taches.map((tache) => (
        <TaskItem
          key={tache.id} // Respect du point d'attention (clé stable)
          tache={tache}
          onToggle={onToggle}
          onSupprimer={onSupprimer}
        />
      ))}
    </ul>
  );
}