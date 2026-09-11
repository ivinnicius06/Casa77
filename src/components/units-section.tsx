"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, MapPin, Clock3, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { units, messages, whatsappUrl, type Unit } from "@/content/site";
import { ActionLink } from "./action-link";
import { track } from "@/lib/analytics";

function UnitPanel({ unit, index }: { unit: Unit; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="unit-panel" ref={ref}>
      <figure className="unit-photo">
        <Image
          src={unit.image}
          alt={unit.imageCaption}
          fill
          sizes="(max-width: 700px) 90vw, 52vw"
        />
        <figcaption>{unit.imageCaption}</figcaption>
      </figure>
      <div className="unit-info">
        <span className="eyebrow">SUA CASA / 0{index + 1}</span>
        <h3>{unit.name}</h3>
        <p className="unit-intro">
          O mesmo cuidado.
          <br />
          Mais perto de você.
        </p>
        <div className="unit-detail">
          <MapPin size={18} />
          <span>
            {unit.address || `${unit.name}, Barreiras — BA`}
            <small>
              {unit.address
                ? "Endereço informado no canal oficial."
                : "Consulte o endereço completo com a equipe."}
            </small>
          </span>
        </div>
        <div className="unit-detail">
          <Clock3 size={18} />
          <span>
            {unit.hours || "Seu horário, com a nossa equipe."}
            <small>
              {unit.hours
                ? "Horário de funcionamento"
                : "Consulte a disponibilidade para agendar."}
            </small>
          </span>
        </div>
        <div className="unit-actions">
          <ActionLink
            source={`unit-${unit.id}`}
            phone={unit.whatsapp}
            message={messages.unit(unit.name)}
            event="booking_click"
          >
            Falar com a unidade
          </ActionLink>
          <a
            className="text-link"
            href={
              unit.maps ||
              whatsappUrl(
                `Olá! Pode me enviar a localização da Casa 77 ${unit.name}?`,
                unit.whatsapp,
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track(unit.maps ? "unit_map_click" : "whatsapp_click", {
                source: unit.id,
              })
            }
          >
            {unit.maps ? "Ver no mapa" : "Pedir localização"}
            <ArrowUpRight size={16} />
          </a>
          <ActionLink source={`unit-app-${unit.id}`} app subtle>
            Agendar pelo aplicativo
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
export function UnitsSection() {
  return (
    <section id="unidades" className="units-section dark-section section-pad">
      <div className="section-kicker" data-reveal>
        <span>03 / NOSSAS UNIDADES</span>
        <span>
          BARREIRAS, BAHIA <Plus size={14} />
        </span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Três endereços.
          <br />
          <span className="muted-word">A mesma Casa.</span>
        </h2>
        <p>
          Escolha onde viver
          <br />a experiência Casa 77.
        </p>
      </div>
      <Tabs defaultValue={units[0].id} className="unit-tabs">
        <TabsList className="unit-tabs-list" aria-label="Escolha uma unidade">
          {units.map((unit, i) => (
            <TabsTrigger className="unit-tab" value={unit.id} key={unit.id}>
              <span>0{i + 1}</span>
              {unit.name}
              <ArrowUpRight size={19} />
            </TabsTrigger>
          ))}
        </TabsList>
        {units.map((unit, i) => (
          <TabsContent key={unit.id} value={unit.id}>
            <UnitPanel unit={unit} index={i} />
          </TabsContent>
        ))}
      </Tabs>
      <div className="mobile-units">
        {units.map((unit, i) => (
          <UnitPanel unit={unit} index={i} key={unit.id} />
        ))}
      </div>
      <noscript>
        <style>{`.unit-tabs{display:none!important}.mobile-units{display:grid!important}.menu-toggle{display:none!important}`}</style>
      </noscript>
      <p className="asset-note">
        Imagens do acervo Casa 77. Identificação das fotos por unidade em
        confirmação.
      </p>
    </section>
  );
}
