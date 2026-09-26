"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Letters({ text }: { text: string }) {
  return Array.from(text).map((letter, index) => (
    <span className="typewriter-letter" key={index}>{letter === " " ? "\u00a0" : letter}</span>
  ));
}

export function PointerBridge() {
  const root = useRef<HTMLDivElement>(null);
  const completed = useRef(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (completed.current) return;
      const element = root.current!;
      const specimen = element.querySelector<HTMLElement>(".pointer-specimen")!;
      const letters = Array.from(element.querySelectorAll<HTMLElement>(".typewriter-letter"));
      const cursor = element.querySelector<HTMLElement>(".specimen-cursor")!;
      const textCursor = element.querySelector(".specimen-cursor--text")!;
      const handCursor = element.querySelector(".specimen-cursor--hand")!;
      const selection = element.querySelector<HTMLElement>(".specimen-selection")!;
      const placement = { progress: 0 };
      let currentLetter = -1;
      let alive = true;

      // Follow the letters, then settle at the highlight corner; remeasure on resize.
      const placeCursor = () => {
        const letter = letters[Math.max(0, currentLetter)];
        const box = selection.getBoundingClientRect();
        const glyph = letter.getBoundingClientRect();
        const x = glyph.left - box.left + (currentLetter < 0 ? 0 : glyph.width);
        const y = glyph.top - box.top + glyph.height / 2 - cursor.offsetHeight * 0.3;
        // The hand's fingertip rests on the highlight's bottom-right corner.
        cursor.style.left = (x + (box.width - x) * placement.progress) + "px";
        cursor.style.top = (y + (box.height - y) * placement.progress) + "px";
      };
      specimen.classList.add("is-typing");
      gsap.set(letters, { opacity: 0 });
      gsap.set(textCursor, { autoAlpha: 1 });
      gsap.set(handCursor, { autoAlpha: 0 });
      gsap.set(selection, { backgroundColor: "transparent" });
      placeCursor();
      const resize = new ResizeObserver(placeCursor);
      resize.observe(specimen);
      resize.observe(selection);
      document.fonts.ready.then(() => { if (alive) placeCursor(); });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: specimen, start: "top 80%", once: true },
        onComplete: () => { completed.current = true; },
      });
      timeline.from(specimen, { y: 20, autoAlpha: 0, duration: 0.35, ease: "power2.out" });
      letters.forEach((letter, index) => {
        const at = 0.4 + index * 0.065;
        timeline.set(letter, { opacity: 1 }, at);
        timeline.call(() => { currentLetter = index; placeCursor(); }, [], at);
      });
      timeline.addLabel("written", 0.4 + letters.length * 0.065 + 0.15)
        .to(placement, { progress: 1, duration: 0.32, ease: "power2.inOut", onUpdate: placeCursor }, "written")
        .to(selection, { backgroundColor: "#29252f", duration: 0.28, ease: "power2.out" }, "written")
        .to(textCursor, { autoAlpha: 0, duration: 0.16 }, "written")
        .to(handCursor, { autoAlpha: 1, duration: 0.2 }, "written+=0.06")
        .to(cursor, { scale: 0.88, duration: 0.14, ease: "power2.inOut" }, "written")
        .to(cursor, { scale: 1, duration: 0.85, ease: "elastic.out(1, 0.45)" }, "written+=0.14");

      return () => {
        alive = false;
        resize.disconnect();
        specimen.classList.remove("is-typing");
        cursor.style.removeProperty("left");
        cursor.style.removeProperty("top");
      };
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root} className="story-bridge story-bridge--pointer" aria-hidden="true">
      <div className="bridge-object pointer-specimen">
        <span className="specimen-window">
          <span><Letters text="Seu ambiente" /></span>
          <span className="specimen-selection">
            <Letters text="responde." />
            <span className="specimen-cursor">
              <img className="specimen-cursor--text" src="/playground/cursors/text.svg" width="64" height="64" alt="" />
              <img className="specimen-cursor--hand" src="/playground/cursors/hover.svg" width="64" height="64" alt="" />
            </span>
          </span>
        </span>
      </div>
      <p className="bridge-caption">Da tela para o gesto.</p>
    </div>
  );
}
