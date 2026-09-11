"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, MapPin, Scissors, Plus } from "lucide-react";
import { ActionLink } from "./action-link";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const chapters = ["Identidade", "O clube", "Nossa casa", "Seu momento"];

export function HeroScrollExperience() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduce } = context.conditions!;
          activeRef.current = 0;
          setActive(0);
          const stages = gsap.utils.toArray<HTMLElement>(
            ".hero-chapter",
            root.current,
          );
          if (reduce) {
            setActive(0);
            return;
          }
          const media = video.current!;
          const connection = (
            navigator as Navigator & { connection?: { saveData?: boolean } }
          ).connection;
          if (!connection?.saveData) {
            media.preload = "auto";
            media.src = `/media/hero-${desktop ? "desktop" : "mobile"}.mp4`;
            media.load();
          }
          let desiredTime = 0;
          let lastSeek = 0;
          const seek = () => {
            if (
              document.hidden ||
              media.seeking ||
              media.readyState < 1 ||
              !Number.isFinite(media.duration)
            )
              return;
            const now = performance.now();
            if (
              now - lastSeek < (desktop ? 32 : 65) ||
              Math.abs(media.currentTime - desiredTime) < 0.035
            )
              return;
            lastSeek = now;
            media.currentTime = Math.min(
              desiredTime,
              Math.max(0, media.duration - 0.04),
            );
          };
          gsap.set(stages.slice(1), { autoAlpha: 0, y: 22 });
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              id: "hero-narrative",
              trigger: root.current,
              pin: ".hero-stage",
              start: "top top",
              end: () =>
                `+=${root.current!.querySelector<HTMLElement>(".hero-stage")!.offsetHeight * (desktop ? 2.9 : 2.4)}`,
              scrub: desktop ? 0.45 : 0.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            onUpdate: () => {
              const p = tl.progress();
              desiredTime = Number.isFinite(media.duration)
                ? p * media.duration
                : 0;
              const next = Math.min(3, Math.floor(p * 4));
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
              }
            },
          });
          triggerRef.current = tl.scrollTrigger!;
          tl.to(
            ".hero-progress-fill",
            { scaleX: 1, ease: "none", duration: 4 },
            0,
          );
          stages.forEach((stage, i) => {
            if (i > 0)
              tl.to(stage, { autoAlpha: 1, y: 0, duration: 0.2 }, i + 0.01);
            if (i < 3)
              tl.to(stage, { autoAlpha: 0, y: -18, duration: 0.18 }, i + 0.83);
          });
          gsap.from(".hero-intro-line", {
            yPercent: 105,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.from(".hero-aside", {
            y: 16,
            autoAlpha: 0,
            duration: 0.7,
            delay: 0.2,
            clearProps: "all",
          });
          gsap.ticker.add(seek);
          const refresh = () => {
            desiredTime = tl.progress() * media.duration;
            seek();
          };
          // Some mobile browsers need a user gesture to decode the first frame.
          let disposed = false;
          const unlock = () => {
            if (!media.getAttribute("src")) return;
            void media
              .play()
              .then(() => {
                media.pause();
                if (!disposed) seek();
              })
              .catch(() => {
                /* The poster remains available if playback is blocked. */
              });
          };
          root.current!.addEventListener("touchstart", unlock, {
            once: true,
            passive: true,
          });
          media.addEventListener("loadedmetadata", refresh);
          media.addEventListener("loadeddata", refresh);
          return () => {
            disposed = true;
            root.current?.removeEventListener("touchstart", unlock);
            gsap.ticker.remove(seek);
            media.removeEventListener("loadedmetadata", refresh);
            media.removeEventListener("loadeddata", refresh);
            media.pause();
            media.removeAttribute("src");
            media.load();
            triggerRef.current = null;
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  function goToChapter(i: number) {
    const trigger = triggerRef.current;
    if (trigger)
      window.scrollTo({
        top: trigger.start + ((i + 0.32) / 4) * (trigger.end - trigger.start),
        behavior: "smooth",
      });
    else
      document
        .getElementById(["a-casa", "assinaturas", "unidades", "contato"][i])
        ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="inicio"
      ref={root}
      className="hero"
      aria-label="Casa 77, barbearia por assinatura em Barreiras"
    >
      <div className="hero-stage">
        <div className="hero-media" aria-hidden="true">
          <video
            ref={video}
            poster="/images/hero-poster.webp"
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
          />
        </div>
        <div className="hero-location">
          <span className="status-dot" /> BARREIRAS, BAHIA{" "}
          <span className="location-divider">/</span> ESTILO COM IDENTIDADE
        </div>
        <div className="hero-members">
          <div className="member-mark">
            <Scissors size={18} />
          </div>
          <span>
            A primeira barbearia
            <br />
            <b>por assinatura da região.</b>
          </span>
        </div>
        <div className="hero-copy">
          <div
            className="hero-chapter"
            inert={active !== 0}
            aria-hidden={active !== 0}
          >
            <div className="hero-title-mask">
              <h1 className="hero-intro-line">
                CASA <span>77.</span>
              </h1>
            </div>
            <div className="hero-title-mask">
              <p className="hero-tagline hero-intro-line">
                Referência se
                <br />
                constrói com
                <br />
                <em>atitude.</em>
              </p>
            </div>
            <p className="hero-description hero-intro-line">
              Barbearia, estilo e experiência.
              <br />O seu lugar em Barreiras.
            </p>
            <a href="#a-casa" className="button hero-intro-line">
              <span>Conheça a Casa 77</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="hero-chapter"
            inert={active !== 1}
            aria-hidden={active !== 1}
          >
            <span className="eyebrow">CLUB 77 / ASSINATURAS</span>
            <h2>
              A primeira.
              <br />A sua
              <br />
              <em>referência.</em>
            </h2>
            <p className="hero-description">
              A primeira barbearia por assinatura da região. Mais liberdade para
              cuidar do seu estilo.
            </p>
            <a href="#assinaturas" className="button">
              Faça parte do Club <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="hero-chapter"
            inert={active !== 2}
            aria-hidden={active !== 2}
          >
            <span className="eyebrow">EM BARREIRAS / POR VOCÊ</span>
            <h2>
              Três unidades.
              <br />
              Uma só
              <br />
              <em>identidade.</em>
            </h2>
            <p className="hero-description">
              Barreirinhas · Renato Gonçalves · Avenida.
              <br />
              Tem uma Casa perto de você.
            </p>
            <a href="#unidades" className="button">
              Encontre sua Casa <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="hero-chapter"
            inert={active !== 3}
            aria-hidden={active !== 3}
          >
            <span className="eyebrow">SEU ESTILO / SEU MOMENTO</span>
            <h2>
              Seu próximo
              <br />
              corte começa
              <br />
              <em>aqui.</em>
            </h2>
            <p className="hero-description">
              Escolha sua unidade e fale com a equipe da Casa 77.
            </p>
            <ActionLink source="hero" />
            <ActionLink source="hero-app" app subtle />
          </div>
        </div>
        <aside className="hero-aside" aria-label="A Casa em números">
          <div className="hero-stat">
            <Plus size={15} />
            <strong>
              300<span>+</span>
            </strong>
            <p>
              assinantes.
              <br />
              Uma comunidade.
            </p>
          </div>
          <div className="hero-stat">
            <Plus size={15} />
            <strong>03</strong>
            <p>
              unidades.
              <br />A mesma essência.
            </p>
          </div>
          <a href="#unidades" className="hero-city">
            <MapPin size={14} />
            <span>
              Feito em Barreiras.
              <br />
              Feito pra você.
            </span>
          </a>
        </aside>
        <div className="precision-mark precision-top" aria-hidden="true">
          <span />
          01 / IDENTIDADE
        </div>
        <div className="precision-mark precision-bottom" aria-hidden="true">
          <span />O DETALHE FAZ A DIFERENÇA.
        </div>
        <div className="hero-bottom">
          <a className="scroll-cue" href="#a-casa">
            <span className="circle-arrow">
              <ArrowDown size={16} />
            </span>
            <span>ESSA É A SUA CASA.</span>
          </a>
          <div className="chapter-navigation" aria-label="Momentos da Casa 77">
            {chapters.map((chapter, i) => (
              <button
                key={chapter}
                aria-label={`Momento ${i + 1}: ${chapter}`}
                aria-current={active === i ? "step" : undefined}
                className={active === i ? "active" : ""}
                onClick={() => goToChapter(i)}
              >
                <span>0{i + 1}</span>
                <span className="chapter-name">{chapter}</span>
              </button>
            ))}
          </div>
          <a
            className="hero-instagram"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            @barbeariacasa77 <ArrowUpRight size={13} />
          </a>
        </div>
        <div className="hero-progress">
          <div className="hero-progress-fill" />
        </div>
        <a href="#a-casa" className="hero-peek">
          <span>01 / A CASA 77</span>
          <span>
            O CORTE É SÓ O COMEÇO. <ArrowDown size={12} />
          </span>
        </a>
      </div>
    </section>
  );
}
