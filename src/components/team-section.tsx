import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { editorial, professionals, messages } from "@/content/site";
import { ActionLink } from "./action-link";

export function TeamSection() {
  const confirmed = professionals.filter((person) => person.confirmed);
  return (
    <section id="equipe" className="team-section section-pad">
      <div className="section-kicker" data-reveal>
        <span>02 / IDENTIDADE & EQUIPE</span>
        <span>
          A NOSSA ESSÊNCIA <Plus size={14} />
        </span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Quem constrói
          <br />a <span className="outline-word">referência.</span>
        </h2>
        <div>
          <p>
            Por trás de cada corte,
            <br />
            um olhar para quem você é.
          </p>
          <a href="#unidades" className="text-link">
            Encontre a sua equipe <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      {confirmed.length ? (
        <div className="team-grid">
          {confirmed.map((person) => (
            <article className="team-card" key={person.id}>
              <div className="team-image">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 700px) 75vw, 30vw"
                />
              </div>
              <h3>{person.name}</h3>
              <p>
                {person.unit} · {person.specialty}
              </p>
              <ActionLink
                source={`team-${person.id}`}
                message={messages.professional(person.name)}
                event="booking_click"
                subtle
              >
                Agendar
              </ActionLink>
            </article>
          ))}
        </div>
      ) : (
        <>
          <div
            className="team-grid editorial-grid"
            role="region"
            aria-label="Editorial Casa 77"
            tabIndex={0}
          >
            {editorial.map((item, i) => (
              <figure className="team-card" key={item.title} data-reveal>
                <div className="team-image">
                  <Image
                    src={item.image}
                    alt={`Editorial Casa 77: ${item.caption}`}
                    fill
                    sizes="(max-width: 700px) 75vw, 30vw"
                  />
                  <span className="image-index">0{i + 1} / CASA 77</span>
                  <ArrowUpRight className="image-arrow" size={24} />
                </div>
                <figcaption>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="editorial-note">
            Editorial da marca. Em breve, conheça os profissionais de cada
            unidade.
          </p>
        </>
      )}
    </section>
  );
}
