import { site } from "@/content/site";
import { ArrowUpRight, Plus, Scissors } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="a-casa" className="about-section dark-section section-pad">
      <div className="section-kicker" data-reveal>
        <span>01 / A CASA 77</span>
        <span>
          MAIS DO QUE UMA BARBEARIA <Plus size={14} />
        </span>
      </div>
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <h2>
            O corte é só
            <br />o <span className="muted-word">começo.</span>
          </h2>
          <p className="lead">
            Mais que um corte.
            <br />
            Uma referência em Barreiras.
          </p>
          <p>{site.about}</p>
          <a href="#unidades" className="text-link">
            Entre. A Casa é sua. <ArrowUpRight size={18} />
          </a>
          <div className="about-signature">
            <Scissors size={32} strokeWidth={1} />
            <span>
              IDENTIDADE NO CORTE.
              <br />
              ATITUDE NA VIDA.
            </span>
          </div>
        </div>
        <div className="about-visual">
          <figure className="about-photo" data-reveal>
            <Image
              src="/images/Ambiente01.jpg"
              alt="Atendimento no ambiente da Casa 77, com espelhos amplos e iluminação linear"
              fill
              sizes="(max-width: 700px) 90vw, 40vw"
              data-parallax
            />
            <figcaption>UM TEMPO PRA VOCÊ. UM CUIDADO NOSSO.</figcaption>
          </figure>
          <div className="about-stamp" aria-label="Casa 77, Barreiras Bahia">
            <span>BARBEARIA</span>
            <strong>77</strong>
            <span>BARREIRAS / BA</span>
          </div>
          <figure className="detail-photo" data-reveal>
            <Image
              src="/images/ACasa77.jpg"
              alt="Ferramentas de trabalho no espaço Casa 77"
              fill
              sizes="(max-width: 700px) 40vw, 20vw"
            />
          </figure>
        </div>
      </div>
      <div className="about-stats" data-reveal>
        <div>
          <strong>03</strong>
          <span>
            Casas abertas.
            <br />
            Uma só essência.
          </span>
        </div>
        <div>
          <strong>
            300<span>+</span>
          </strong>
          <span>
            Pessoas que fazem
            <br />
            parte do nosso Club.
          </span>
        </div>
        <div className="about-manifesto">
          Referência se constrói
          <br />
          <em>com atitude.</em>
          <ArrowUpRight size={35} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
