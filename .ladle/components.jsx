// Schriften lokal aus Nordhaus (src/fonts.css, woff2) – Katalog und Bilder brauchen kein Netz.
import 'nordhaus-ui/src/fonts.css';
import 'nordhaus-ui/.ladle/demo.css';

// Ladle setzt data-theme="light" | "dark" auf <html> – dieselben Werte wie die Nordhaus-Themes.
export const Provider = ({ children }) => children;
