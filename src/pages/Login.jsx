import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, MapPin } from 'lucide-react';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ nom: '', email: '', mot_de_passe: '', adresse: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const url = isRegister 
      ? 'http://localhost/bricovoisins-api/register.php'
      : 'http://localhost/bricovoisins-api/login.php';

    axios.post(url, formData)
      .then(res => {
        if (res.data.success) {
          if (isRegister) {
            alert('Compte créé ! Connectez-vous maintenant.');
            setIsRegister(false);
          } else {
            // Sauvegarde de l'utilisateur dans la session locale du navigateur
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert(`Bienvenue ${res.data.user.nom} !`);
            window.location.href = '/';
          }
        } else {
          setError(res.data.message);
        }
      })
      .catch(() => setError('Erreur de connexion au serveur'));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isRegister ? <><UserPlus size={24} color="#2563eb" /> Inscription</> : <><LogIn size={24} color="#2563eb" /> Connexion</>}
        </h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {isRegister && (
            <>
              <div style={styles.field}>
                <label style={styles.label}><User size={16} /> Nom complet</label>
                <input
                  type="text"
                  required
                  style={styles.input}
                  placeholder="ex: Alex Martin"
                  onChange={e => setFormData({ ...formData, nom: e.target.value })}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}><MapPin size={16} /> Ville / Quartier</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="ex: Paris 11e"
                  onChange={e => setFormData({ ...formData, adresse: e.target.value })}
                />
              </div>
            </>
          )}

          <div style={styles.field}>
            <label style={styles.label}><Mail size={16} /> Email</label>
            <input
              type="email"
              required
              style={styles.input}
              placeholder="votre@email.com"
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}><Lock size={16} /> Mot de passe</label>
            <input
              type="password"
              required
              style={styles.input}
              placeholder="••••••••"
              onChange={e => setFormData({ ...formData, mot_de_passe: e.target.value })}
            />
          </div>

          <button type="submit" style={styles.button}>
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"} {' '}
          <span style={styles.link} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Se connecter" : "S'inscrire"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '420px', margin: '4rem auto', padding: '1rem' },
  card: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  title: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', marginBottom: '1.5rem', fontSize: '1.4rem' },
  error: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.85rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  input: { padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' },
  button: { padding: '0.8rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
  toggleText: { textAlign: 'center', marginTop: '1.2rem', fontSize: '0.9rem', color: '#64748b' },
  link: { color: '#2563eb', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }
};