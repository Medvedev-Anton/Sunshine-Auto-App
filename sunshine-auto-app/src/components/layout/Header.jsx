import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="logo-icon">🚗</span>
        <h1>Sunshine Auto</h1>
      </div>
      <nav className="header-nav">
        <button className="nav-button">Explore</button>
        <button className="nav-button">Contact</button>
      </nav>
    </header>
  );
} 