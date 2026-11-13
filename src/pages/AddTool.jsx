import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image, MapPin, Tag, FileText } from 'lucide-react';

export default function AddTool() {
  const [tool, setTool] = useState({ titre: '', categorie: 'Bricolage', ville: '', photo: '', description: '' });
  const navigate = useNavigate();

  const API_URL = 'http://localhost/bricovoisins-api/add_annonce.php';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Récupération de l'utilisateur connecté dans localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : 1;

    // Ajout de utilisateur_id dans les données envoyées
    const payload = {
      ...tool,
      utilisateur_id: userId
    };

    axios.post(API_URL, payload)
      .then(response => {
        if (response.data.success) {
          alert('Annonce publiée avec succès !');
          navigate('/');
        } else {
          alert('Erreur : ' + response.data.message);
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout :", error);
        alert("Impossible de contacter le serveur.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}><PlusCircle size={24} color="#2563eb" /> Proposer un outil en prêt</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Titre de l'annonce</label>
          <input
            type="text"
            placeholder="ex: Perforeuse Makita 800W"
            required
            style={styles.input}
            value={tool.titre}
            onChange={(e) => setTool({ ...tool, titre: e.target.value })}
          />
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.field, flex: 1 }}>
            <label style={styles.label}><Tag size={16} /> Catégorie</label>
            <select
              style={styles.select}
              value={tool.categorie}
              onChange={(e) => setTool({ ...tool, categorie: e.target.value })}
            >
              <option value="Bricolage">Bricolage</option>
              <option value="Jardinage">Jardinage</option>
              <option value="Nettoyage">Nettoyage / Entretien</option>
              <option value="Manutention">Manutention</option>
            </select>
          </div>

          <div style={{ ...styles.field, flex: 1 }}>
            <label style={styles.label}><MapPin size={16} /> Ville / Quartier</label>
            <input
              type="text"
              placeholder="ex: Paris 11e"
              required
              style={styles.input}
              value={tool.ville}
              onChange={(e) => setTool({ ...tool, ville: e.target.value })}
            />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}><Image size={16} /> URL de la photo</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            style={styles.input}
            value={tool.photo}
            onChange={(e) => setTool({ ...tool, photo: e.target.value })}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}><FileText size={16} /> Description</label>
          <textarea
            rows="4"
            placeholder="Décrivez l'état de l'outil..."
            style={styles.textarea}
            value={tool.description}
            onChange={(e) => setTool({ ...tool, description: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" style={styles.submitBtn}>Publier l'annonce</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '700px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  title: { display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  row: { display: 'flex', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.9rem', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  input: { padding: '0.70rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' },
  select: { padding: '0.70rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#fff' },
  textarea: { padding: '0.70rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'vertical' },
  submitBtn: { padding: '0.9rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' }
};