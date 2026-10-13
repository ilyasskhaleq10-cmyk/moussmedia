"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/components/useIsoLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

// Envuelve cualquier bloque: sus hijos directos suben y aparecen ligados al scroll
export default function Reveal({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: React.ElementType }) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { y: 50, opacity: 0.2 },
        { y: 0, opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 45%", scrub: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
