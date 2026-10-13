"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollVideo.module.css";

gsap.registerPlugin(ScrollTrigger);

type Caption = { at: number; kicker: string; title: string; text: string };

// Vídeo que avanza y retrocede con el scroll (como Apple o Rolex).
// Para que vaya fluido, codifica el vídeo con scripts/encode-scroll-video.sh
export default function ScrollVideo({ id, video, poster, captions }: { id?: string; video: string; poster: string; captions: Caption[] }) {
  const root = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = vid.current!;
    let target = 0, current = 0, raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // En iOS hace falta "despertar" el vídeo para poder buscar fotogramas
    const prime = () => { v.play().then(() => v.pause()).catch(() => {}); };
    v.addEventListener("loadedmetadata", prime, { once: true });

    const loop = () => {
      current += (target - current) * (reduce ? 1 : 0.12);
      if (v.duration && Math.abs(v.currentTime - current * v.duration) > 0.01) {
        v.currentTime = current * v.duration;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => {
        target = s.progress;
        if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
        let idx = 0;
        captions.forEach((c, i) => { if (s.progress >= c.at) idx = i; });
        setActive(idx);
      },
    });

    return () => { cancelAnimationFrame(raf); st.kill(); };
  }, [captions]);

  return (
    <section ref={root} id={id} className={styles.section} style={{ height: `${Math.max(3, captions.length + 1) * 100}svh` }}>
      <div className={styles.sticky}>
        <video ref={vid} className={styles.video} src={video} poster={poster} muted playsInline preload="auto" />
        <div className={styles.shade} />
        <div className={`${styles.captions} wrap`}>
          {captions.map((c, i) => (
            <div key={i} className={`${styles.caption} ${i === active ? styles.on : ""}`} aria-hidden={i !== active}>
              <span className={styles.kicker}>{c.kicker}</span>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.track}><div ref={bar} className={styles.bar} /></div>
      </div>
    </section>
  );
}
