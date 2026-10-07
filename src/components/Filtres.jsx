export default function Filtres({ filtreActif, onChangerFiltre }) {
  return (
    <div className="filtres">
      <button
        className={filtreActif === 'toutes' ? 'actif' : ''}
        onClick={() => onChangerFiltre('toutes')}
      >
        Toutes
      </button>
      <button
        className={filtreActif === 'en-cours' ? 'actif' : ''}
        onClick={() => onChangerFiltre('en-cours')}
      >
        En cours
      </button>
      <button
        className={filtreActif === 'terminees' ? 'actif' : ''}
        onClick={() => onChangerFiltre('terminees')}
      >
        Terminées
      </button>
    </div>
  );
}