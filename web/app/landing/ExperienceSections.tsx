"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorLab } from "./CursorLab";
import { FontLab } from "./FontLab";
import { PointerBridge } from "./PointerBridge";
import { preloadAroliCursors } from "../aroli-cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function ExperienceSections({
  mode,
  onMode,
}: {
  mode: "circle" | "aroli";
  onMode: (mode: "circle" | "aroli") => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = root.current?.querySelector("#cursor");
    if (!section) return;
    const preload = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void preloadAroliCursors();
          preload.disconnect();
        }
      },
      { rootMargin: "800px 0px", threshold: 0 },
    );
    // The first arrival introduces Aroli. Later manual choices remain in
    // charge, including when scrolling back from the font lab.
    const arrival = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onMode("aroli");
          arrival.disconnect();
        }
      },
      { rootMargin: "-10% 0px -25% 0px", threshold: 0 },
    );
    preload.observe(section);
    arrival.observe(section);
    return () => {
      preload.disconnect();
      arrival.disconnect();
    };
  }, [onMode]);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current?.querySelectorAll<HTMLElement>(".story-bridge--type").forEach((bridge) => {
          gsap.from(bridge.querySelector(".bridge-object"), {
            y: 32, autoAlpha: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: bridge, start: "top 80%", once: true },
          });
        });
        root.current
          ?.querySelectorAll<HTMLElement>(".experience-section")
          .forEach((section) => {
            gsap.from(section.querySelector(".experience-heading"), {
              y: 32,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: section, start: "top 88%", once: true },
            });
            gsap.from(section.querySelector(".experience-panel"), {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section.querySelector(".experience-panel"),
                start: "top 94%",
                once: true,
              },
            });
          });
        let active = true;
        document.fonts.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });
        return () => {
          active = false;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className="experience-story">
      <PointerBridge />
      <CursorLab mode={mode} onMode={onMode} />
      <div className="story-bridge story-bridge--type" aria-hidden="true">
        <div className="bridge-object mono-specimen"><span>Aa</span><span className="specimen-caret" /></div>
        <p className="bridge-caption">Do gesto para a primeira linha.</p>
      </div>
      <FontLab />

    </div>
  );
}
