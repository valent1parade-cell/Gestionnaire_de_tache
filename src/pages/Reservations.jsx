import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, CheckCircle, Hourglass, XCircle } from 'lucide-react';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost/bricovoisins-api/get_reservations.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setReservations(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement des réservations :", err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'confirmee':
        return <span style={{ ...styles.badge, backgroundColor: '#dcfce7', color: '#166534' }}><CheckCircle size={14} /> Confirmée</span>;
      case 'refusee':
        return <span style={{ ...styles.badge, backgroundColor: '#fee2e2', color: '#991b1b' }}><XCircle size={14} /> Refusée</span>;
      default:
        return <span style={{ ...styles.badge, backgroundColor: '#fef3c7', color: '#92400e' }}><Hourglass size={14} /> En attente</span>;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}><Calendar size={24} color="#2563eb" /> Mes demandes d'emprunts</h2>

      {loading ? (
        <p>Chargement des réservations...</p>
      ) : reservations.length === 0 ? (
        <p style={{ color: '#64748b' }}>Vous n'avez effectué aucune demande pour le moment.</p>
      ) : (
        <div style={styles.list}>
          {reservations.map(res => (
            <div key={res.id} style={styles.card}>
              <img src={res.photo || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400'} alt={res.outil_titre} style={styles.image} />
              <div style={styles.info}>
                <div style={styles.header}>
                  <h3 style={styles.toolTitle}>{res.outil_titre}</h3>
                  {getStatusBadge(res.statut)}
                </div>
                <p style={styles.subtext}><MapPin size={14} /> {res.ville} • Propriétaire : <strong>{res.proprietaire}</strong></p>
                <p style={styles.dates}><Clock size={14} /> Du <strong>{res.date_debut}</strong> au <strong>{res.date_fin}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '2rem auto', padding: '1rem' },
  title: { display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { display: 'flex', gap: '1rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', alignItems: 'center' },
  image: { width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' },
  toolTitle: { fontSize: '1.1rem', margin: 0, color: '#0f172a' },
  subtext: { color: '#64748b', fontSize: '0.85rem', margin: '0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  dates: { color: '#334155', fontSize: '0.9rem', margin: '0.4rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2.rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }
};