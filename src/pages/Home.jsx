import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, MapPin, Tag } from 'lucide-react';

export default function Home() {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Ajuste le port/chemin si ton MAMP utilise un port spécifique (ex: http://localhost:8888/bricovoisins-api/get_annonces.php)
  const API_URL = 'http://localhost/bricovoisins-api/get_annonces.php'; 

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        if (Array.isArray(response.data)) {
          setTools(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        setLoading(false);
      });
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Empruntez des outils à vos voisins</h1>
        <p style={styles.heroSubtitle}>Économisez de l'argent et simplifiez vos travaux.</p>

        <div style={styles.searchBar}>
          <Search color="#94a3b8" size={20} />
          <input
            type="text"
            placeholder="Que cherchez-vous ? (ex: Perceuse, Tondeuse...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      {/* Liste des outils */}
      <h2 style={styles.sectionTitle}>Derniers outils disponibles</h2>

      {loading ? (
        <p>Chargement des annonces...</p>
      ) : (
        <div style={styles.grid}>
          {filteredTools.map(tool => (
            <div key={tool.id} style={styles.card}>
              <img 
                src={tool.photo || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400'} 
                alt={tool.titre} 
                style={styles.cardImage} 
              />
              <div style={styles.cardContent}>
                <span style={styles.badge}><Tag size={12} /> {tool.categorie}</span>
                <h3 style={styles.cardTitle}>{tool.titre}</h3>
                <p style={styles.location}><MapPin size={14} /> {tool.ville}</p>
                <Link to={`/outil/${tool.id}`} style={{ textDecoration: 'none' }}>
                  <button style={styles.cardButton}>Voir la fiche</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  hero: { textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f1f5f9', borderRadius: '12px', marginBottom: '3rem' },
  heroTitle: { fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem' },
  heroSubtitle: { color: '#64748b', fontSize: '1.1rem', marginBottom: '1.5rem' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '0.8rem 1.2rem', borderRadius: '50px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  input: { border: 'none', outline: 'none', width: '100%', marginLeft: '0.8rem', fontSize: '1rem' },
  sectionTitle: { fontSize: '1.5rem', color: '#1e293b', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
  card: { backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  cardImage: { width: '100%', height: '180px', objectFit: 'cover' },
  cardContent: { padding: '1.2rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' },
  cardTitle: { fontSize: '1.1rem', margin: '0.5rem 0', color: '#1e293b' },
  location: { display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' },
  cardButton: { width: '100%', padding: '0.6rem', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }
};