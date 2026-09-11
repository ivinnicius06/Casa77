import Link from "next/link";
import { ArrowUpRight, Camera as Instagram, Plus } from "lucide-react";
import { site, units } from "@/content/site";
import { Brand } from "./header";
import { ActionLink } from "./action-link";

export function FinalCTA() {
  return (
    <section id="contato" className="final-cta section-pad">
      <div className="section-kicker">
        <span>SEU ESTILO MERECE ESSE ENCONTRO.</span>
        <Plus size={18} />
      </div>
      <div className="final-cta-main" data-reveal>
        <h2>
          Seu lugar na Casa
          <br />
          está <span>reservado.</span>
        </h2>
        <ArrowUpRight className="final-big-arrow" strokeWidth={0.8} />
      </div>
      <div className="final-cta-bottom" data-reveal>
        <p>
          Escolha sua unidade, fale com a equipe e cuide
          <br className="desktop-break" /> do seu estilo com quem é referência
          em Barreiras.
        </p>
        <div>
          <ActionLink source="final" className="button-black">
            Chamar no WhatsApp
          </ActionLink>
          <ActionLink source="final-app" app subtle>
            Abrir aplicativo
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer dark-section section-pad">
      <div className="footer-top">
        <div>
          <Brand footer />
          <p>
            Referência se constrói com atitude.
            <br />
            Barreiras, Bahia.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Instagram size={17} /> @barbeariacasa77 <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-nav">
          <span>EXPLORE A CASA</span>
          {site.nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="footer-nav">
          <span>ENCONTRE SUA UNIDADE</span>
          {units.map((unit) => (
            <a href="#unidades" key={unit.id}>
              {unit.name}
              <ArrowUpRight size={13} />
            </a>
          ))}
          <a href="#unidades" className="footer-all-units">
            Encontrar uma unidade <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-nav">
          <span>SEU PRÓXIMO HORÁRIO</span>
          <ActionLink source="footer" subtle>
            WhatsApp
          </ActionLink>
          <ActionLink source="footer-app" app subtle>
            Aplicativo Casa 77
          </ActionLink>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        CASA<span>77.</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Barbearia Casa 77. Todos os direitos
          reservados.
        </span>
        <span>BARREIRAS / BAHIA / BRASIL</span>
        <Link href="/privacidade">
          Privacidade <ArrowUpRight size={12} />
        </Link>
      </div>
    </footer>
  );
}
