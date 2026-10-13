"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 400);
      setSolid(y > 80);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${hidden ? styles.hide : ""} ${solid ? styles.solid : ""}`}>
      <a className={styles.brand} href="#top" aria-label="Mouss Media, inicio">
        <span className={styles.mark} aria-hidden="true" />
        Mouss Media
      </a>
      <nav className={styles.links} aria-label="Secciones">
        <a href="#metodo">Método</a>
        <a href="#trabajo">Trabajo</a>
        <a href="#membresia">Membresía</a>
        <a href="#plazas">Plazas</a>
      </nav>
      <a className="btn small" href="#solicitud">Lista de espera</a>
    </header>
  );
}
