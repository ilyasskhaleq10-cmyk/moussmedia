"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { setShow(!localStorage.getItem("mm-cookies")); } catch { setShow(false); }
  }, []);

  const choose = (c: "accepted" | "rejected") => {
    try { localStorage.setItem("mm-cookies", c); } catch {}
    setShow(false);
    const w = window as unknown as { loadAnalytics?: () => void };
    if (c === "accepted") w.loadAnalytics?.();
  };

  if (!show) return null;
  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      style={{
        position: "fixed", left: "var(--gut)", right: "var(--gut)", bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        zIndex: 60, maxWidth: 520, background: "var(--bg-2)", border: "1px solid var(--line)", padding: 22, display: "grid", gap: 14,
      }}
    >
      <p style={{ fontSize: 14, color: "var(--mute)" }}>
        Usamos cookies técnicas, tipografías de Google Fonts y, si lo aceptas, Google Analytics para entender cómo se usa la web.{" "}
        <a href="/legal.html#cookies">Más información</a>.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn solid small" onClick={() => choose("accepted")}>Aceptar</button>
        <button className="btn small" onClick={() => choose("rejected")}>Rechazar</button>
      </div>
    </div>
  );
}
