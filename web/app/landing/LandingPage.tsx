"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type MouseEvent } from "react";
import { MotionCursor } from "../MotionCursor";
import { HeroHeading } from "./HeroHeading";
import { MoreSection } from "./MoreSection";
import { Notebook } from "./Notebook";
import { NotebookApps } from "./NotebookApps";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ExperienceSections } from "./ExperienceSections";
import { NOTEBOOK_APPS } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const STOPS = [1.35, 2.25, 3.15];

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<gsap.core.Timeline | null>(null);
  const [activeApp, setActiveApp] = useState(0);
  const [cursorMode, setCursorMode] = useState<"circle" | "aroli">("circle");

  const selectApp = (index: number) => {
    const timeline = scene.current;
    const trigger = timeline?.scrollTrigger;
    if (timeline && trigger) {
      // ScrollTrigger alone owns the playhead, including navigation by buttons.
      const progress = STOPS[index] / timeline.duration();
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "smooth" });
    } else {
      document.getElementById(`theme-${NOTEBOOK_APPS[index].id}`)?.scrollIntoView({ behavior: "instant" });
    }
  };
  const goToThemes = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    selectApp(0);
    root.current?.querySelector<HTMLElement>(scene.current ? ".scene-nav button" : "#theme-vscode a")?.focus({ preventScroll: true });
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 761px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)", () => {
      const element = root.current!;
      element.classList.add("story-enhanced");
      gsap.set(".notebook-app, .scene-nav, .scene-caption", { autoAlpha: 0 });
      gsap.set(".capture-zed, .capture-kitty", { opacity: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate() {
          const time = this.time();
          setActiveApp(time >= 2.75 ? 2 : time >= 1.85 ? 1 : 0);
        },
        scrollTrigger: {
          trigger: ".landing-runway", start: "top top", end: "bottom bottom",
          scrub: 0.2, invalidateOnRefresh: true,
        },
      });
      scene.current = timeline;
      timeline
        .to(".landing-heading, .hero-bg", { autoAlpha: 0, y: -24, duration: 0.35 }, 0.15)
        .fromTo(".notebook-entrance", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 }, 0.35)
        .fromTo(".notebook", { scale: 0.88, yPercent: 12 }, { scale: 1, yPercent: 0, duration: 0.65 }, 0.35)
        .fromTo(".notebook-lid", { rotationX: -68 }, { rotationX: 0, duration: 0.7, ease: "power1.inOut" }, 0.35)
        .to(".app-vscode, .scene-nav, .scene-caption", { autoAlpha: 1, duration: 0.2 }, 1)
        .to(".app-vscode", { autoAlpha: 0, duration: 0.25 }, 1.7)
        .to(".app-zed", { autoAlpha: 1, duration: 0.25 }, 1.85)
        // Incoming opaque screenshots cover the previous one: no black frame.
        .to(".capture-zed", { opacity: 1, duration: 0.4 }, 1.7)
        .to(".app-zed", { autoAlpha: 0, duration: 0.25 }, 2.6)
        .to(".app-kitty", { autoAlpha: 1, duration: 0.25 }, 2.75)
        .to(".capture-kitty", { opacity: 1, duration: 0.4 }, 2.6)
        .to(".landing-meter span", { scaleX: 1, duration: 3.6 }, 0);
      let alive = true;
      document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
      return () => {
        alive = false;
        scene.current = null;
        element.classList.remove("story-enhanced");
      };
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root} className="brand-story">
      <a className="skip-link" href="#mais">Ir para os downloads</a>
      <SiteHeader onExplore={goToThemes} />
      <main id="inicio">
        <div className="landing-runway">
          <div className="landing-stage">
            <div className="hero-bg" aria-hidden="true">
              <div className="encaixe-plane encaixe-plane--upper" />
              <div className="encaixe-plane encaixe-plane--lower" />
            </div>
            <HeroHeading onExplore={goToThemes} />
            <NotebookApps />
            <div className="notebook-entrance"><Notebook /></div>
            <nav className="scene-nav" aria-label="Rever uma integração">
              {NOTEBOOK_APPS.map((app, index) => (
                <button key={app.id} type="button" aria-pressed={activeApp === index} onClick={() => selectApp(index)}>
                  <span aria-hidden="true">0{index + 1}</span> {app.name}
                </button>
              ))}
            </nav>
            <p className="scene-caption">Capturas da geração anterior. A paleta permanece.</p>
            <div className="landing-meter" aria-hidden="true"><span /></div>
            <div className="stage-fade" aria-hidden="true" />
          </div>
        </div>
        <ExperienceSections mode={cursorMode} onMode={setCursorMode} />
        <MoreSection />
      </main>
      <SiteFooter />
      <MotionCursor mode={cursorMode} />
    </div>
  );
}
