"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reels } from "@/content/site";
import styles from "./ReelGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

// Carril horizontal de reels 9:16: el scroll vertical lo desplaza de lado
export default function ReelGallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
      });
    }, root);

    // Cada reel se reproduce solo cuando está a la vista
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
      }),
      { threshold: 0.4 }
    );
    root.current!.querySelectorAll("video").forEach((v) => io.observe(v));

    return () => { ctx.revert(); io.disconnect(); };
  }, []);

  return (
    <section ref={root} className={styles.section} id="trabajo" aria-labelledby="trabajo-title">
      <div className={styles.sticky}>
        <div className={`${styles.head} wrap`}>
          <h2 id="trabajo-title">Trabajo reciente</h2>
          <span className="eyebrow">Desliza</span>
        </div>
        <div ref={track} className={styles.track}>
          {reels.map((r) => (
            <figure key={r.video} className={styles.card}>
              <video src={r.video} poster={r.poster} muted loop playsInline preload="metadata" />
              <figcaption><b>{r.title}</b><span>{r.tag}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
