import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer
      className="wrap"
      style={{
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16,
        paddingBlock: "40px calc(40px + env(safe-area-inset-bottom, 0px))",
        borderTop: "1px solid var(--line)", color: "var(--mute)", fontSize: 13,
      }}
    >
      <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
      <nav aria-label="Legal y redes" style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <a href={site.instagram} rel="noopener" style={{ textDecoration: "none" }}>Instagram</a>
        <a href="/legal.html" style={{ textDecoration: "none" }}>Aviso legal</a>
        <a href="/legal.html#privacidad" style={{ textDecoration: "none" }}>Privacidad</a>
        <a href="/legal.html#cookies" style={{ textDecoration: "none" }}>Cookies</a>
      </nav>
    </footer>
  );
}
