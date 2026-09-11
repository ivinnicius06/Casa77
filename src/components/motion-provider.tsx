"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function MotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Native touch scrolling avoids a second scroll controller on phones.
      mm.add(
        "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            syncTouch: false,
            anchors: { offset: -88 },
            autoRaf: false,
          });
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => {
            if (!document.hidden) lenis.raf(time * 1000);
          };
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          return () => {
            gsap.ticker.remove(tick);
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
          };
        },
      );
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]",
          root.current,
        );
        reveals.forEach((el) =>
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
            clearProps: "all",
          }),
        );
        gsap.utils
          .toArray<HTMLElement>("[data-parallax]", root.current)
          .forEach((el) =>
            gsap.fromTo(
              el,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            ),
          );
      });
      let disposed = false;
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        disposed = true;
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
