"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/components/useIsoLayoutEffect";
import { hero } from "@/content/site";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

// Vídeo a pantalla completa que, al hacer scroll, se recoge en un marco
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.line}`, { yPercent: 110, duration: 1.6, ease: "expo.out", stagger: 0.12, delay: 0.2 });
      gsap.from(`.${styles.foot}`, { opacity: 0, y: 20, duration: 1.2, delay: 0.8, ease: "power2.out" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(`.${styles.media}`, { clipPath: "inset(12% 8% 12% 8%)", scale: 0.92, ease: "none" }, 0)
        .to(`.${styles.copy}`, { yPercent: -40, opacity: 0, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.media}>
        <video className={styles.video} src={hero.video} poster={hero.poster} autoPlay muted loop playsInline preload="auto" />
        <div className={styles.shade} />
      </div>
      <div className={`${styles.copy} wrap`}>
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className={styles.title}>
          {hero.title.map((t, i) => (
            <span key={i} className={styles.mask}>
              <span className={`${styles.line} ${i === hero.title.length - 1 ? styles.em : ""}`}>{t}</span>
            </span>
          ))}
        </h1>
        <div className={styles.foot}>
          <p>{hero.text}</p>
          <div className={styles.actions}>
            <a className="btn solid" href="#solicitud">Solicitar plaza</a>
            <a className="btn" href="#metodo">Ver el método</a>
          </div>
        </div>
      </div>
    </section>
  );
}
