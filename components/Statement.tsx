"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/components/useIsoLayoutEffect";
import styles from "./Statement.module.css";

gsap.registerPlugin(ScrollTrigger);

// Frase grande que se ilumina palabra a palabra al hacer scroll
export default function Statement({ text }: { text: string }) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.word}`,
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: true } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`${styles.statement} wrap`}>
      <p className={styles.text}>
        {text.split(" ").map((w, i) => (
          <span key={i} className={styles.word}>{w} </span>
        ))}
      </p>
    </section>
  );
}
