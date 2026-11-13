import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Tag, User, Calendar, CheckCircle } from 'lucide-react';

export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [dates, setDates] = useState({ date_debut: '', date_fin: '' });

  useEffect(() => {
    axios.get(`http://localhost/bricovoisins-api/get_annonce_detail.php?id=${id}`)
      .then(res => setTool(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleReservation = (e) => {
    e.preventDefault();

    // Récupération de l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : 2;

    axios.post('http://localhost/bricovoisins-api/add_reservation.php', {
      annonce_id: id,
      emprunteur_id: userId,
      ...dates
    })
    .then(res => {
      if (res.data.success) {
        alert('Votre demande de réservation a été envoyée au propriétaire !');
        navigate('/reservations');
      } else {
        alert('Erreur : ' + (res.data.message || res.data.error));
      }
    })
    .catch(err => console.error("Erreur réservation :", err));
  };

  if (!tool) return <p style={{ padding: '2rem' }}>Chargement...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div>
          <img src={tool.photo_url || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400'} alt={tool.titre} style={styles.image} />
          <h1 style={styles.title}>{tool.titre}</h1>
          <div style={styles.meta}>
            <span style={styles.badge}><Tag size={14} /> {tool.categorie}</span>
            <span><MapPin size={14} /> {tool.ville}</span>
            <span><User size={14} /> Proposé par <strong>{tool.proprietaire}</strong></span>
          </div>
          <h3>Description</h3>
          <p style={styles.desc}>{tool.description || "Aucune description renseignée."}</p>
        </div>

        {/* Formulaire de réservation */}
        <div style={styles.bookingBox}>
          <h3 style={styles.bookingTitle}><Calendar size={20} color="#2563eb" /> Réserver cet outil</h3>
          <form onSubmit={handleReservation} style={styles.form}>
            <label style={styles.label}>Date de début :</label>
            <input
              type="date"
              required
              style={styles.input}
              onChange={e => setDates({ ...dates, date_debut: e.target.value })}
            />

            <label style={styles.label}>Date de fin :</label>
            <input
              type="date"
              required
              style={styles.input}
              onChange={e => setDates({ ...dates, date_fin: e.target.value })}
            />

            <button type="submit" style={styles.button}>
              <CheckCircle size={18} /> Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' },
  image: { width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px' },
  title: { fontSize: '2rem', marginTop: '1rem', color: '#0f172a' },
  meta: { display: 'flex', gap: '1.2rem', alignItems: 'center', color: '#64748b', margin: '1rem 0' },
  badge: { backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: '600', fontSize: '0.85rem' },
  desc: { lineHeight: '1.6', color: '#334155' },
  bookingBox: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' },
  bookingTitle: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0f172a' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  label: { fontSize: '0.85rem', fontWeight: '600', color: '#475569' },
  input: { padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' },
  button: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }
};