"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectors, sectorsNote } from "@/content/site";
import styles from "./Sectors.module.css";

// Lista de sectores: el que está en el centro de la pantalla (o bajo el ratón) muestra su vídeo
export default function Sectors() {
  const root = useRef<HTMLElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rows = root.current!.querySelectorAll<HTMLElement>(`.${styles.row}`);
    const triggers = Array.from(rows).map((row, i) =>
      ScrollTrigger.create({ trigger: row, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i) })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  return (
    <section ref={root} className={`${styles.sectors} wrap`} id="sectores" aria-labelledby="sectores-title">
      <header className={styles.head}>
        <p className="eyebrow">Para quién trabajamos</p>
        <h2 id="sectores-title">Marcas que venden algo extraordinario</h2>
      </header>
      <div className={styles.grid}>
        <ul className={styles.list}>
          {sectors.map((s, i) => (
            <li key={s.name} className={`${styles.row} ${i === active ? styles.on : ""}`} onMouseEnter={() => setActive(i)}>
              <b>{s.name}</b>
              <span>{s.tag}</span>
            </li>
          ))}
        </ul>
        <div className={styles.frame}>
          {sectors.map((s, i) => (
            <video
              key={s.name}
              ref={(el) => { vids.current[i] = el; }}
              className={`${styles.video} ${i === active ? styles.show : ""}`}
              src={s.video}
              poster={s.poster}
              muted loop playsInline preload="metadata"
              aria-hidden={i !== active}
            />
          ))}
        </div>
      </div>
      <p className={styles.note}>{sectorsNote}</p>
    </section>
  );
}
