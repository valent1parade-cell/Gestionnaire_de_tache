import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, PlusCircle, Calendar, LogIn, LogOut, User, Inbox } from 'lucide-react';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <Wrench color="#2563eb" size={28} />
        <span>BricoVoisins</span>
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/ajouter" style={styles.link}><PlusCircle size={18} /> Déposer un outil</Link>
        <Link to="/reservations" style={styles.link}><Calendar size={18} /> Mes emprunts</Link>
        <Link to="/demandes" style={styles.link}><Inbox size={18} /> Demandes reçues</Link>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={styles.userInfo}><User size={16} /> {user.nom}</span>
            <button onClick={handleLogout} style={styles.logoutBtn} title="Déconnexion"><LogOut size={16} /></button>
          </div>
        ) : (
          <Link to="/connexion" style={styles.loginBtn}><LogIn size={18} /> Connexion</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0f172a', fontWeight: 'bold', fontSize: '1.25rem' },
  links: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  link: { display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', color: '#475569', fontWeight: '500' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600', color: '#0f172a', backgroundColor: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '20px' },
  logoutBtn: { border: 'none', backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  loginBtn: { display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '500' }
};