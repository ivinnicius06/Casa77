"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, Plus } from "lucide-react";
import { reviews, reviewSummary, reviewUnits } from "@/content/site";

export function ReviewsSection() {
  const items = reviews.filter((review) => review.verified);
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    if (!track.current || !items.length) return;
    const next = (index + direction + items.length) % items.length;
    const card = track.current.children[next] as HTMLElement;
    track.current.scrollTo({
      left: card.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      id="avaliacoes"
      className="reviews-section dark-section section-pad"
    >
      <div className="section-kicker" data-reveal>
        <span>05 / A VOZ DE QUEM É DA CASA</span>
        <span>
          EXPERIÊNCIAS REAIS <Plus size={14} />
        </span>
      </div>
      <div className="reviews-layout">
        <div data-reveal>
          <span className="google-label">
            <span className="google-g">G</span> AVALIAÇÕES NO GOOGLE
          </span>
          <h2>
            Quem conhece,
            <br />
            <span className="muted-word">recomenda.</span>
          </h2>
          <p className="reviews-total">
            <strong>{reviewSummary.count}</strong> avaliações nas nossas três
            unidades.
          </p>
          <div
            className="review-unit-links"
            aria-label="Avaliações por unidade"
          >
            {reviewUnits.map((unit) => (
              <a
                key={unit.id}
                href={unit.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver avaliações de ${unit.name} no Google: nota ${unit.rating.toFixed(1).replace(".", ",")}, ${unit.count} avaliações`}
              >
                <span className="review-unit-name">
                  {unit.name}
                  <small>{unit.count} avaliações</small>
                </span>
                <span className="review-unit-score">
                  <Star size={15} fill="currentColor" aria-hidden="true" />
                  {unit.rating.toFixed(1).replace(".", ",")}
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="reviews-updated">
            Dados do Google consultados em{" "}
            <time dateTime={reviewSummary.verifiedOn}>11/09/2026</time>.
          </p>
        </div>
        <div className="reviews-content" data-reveal>
          <p className="review-selection-label">
            PALAVRAS DE QUEM JÁ SENTOU NA CADEIRA
          </p>
          <div
            className="review-track"
            ref={track}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            tabIndex={0}
            onScroll={() => {
              if (!track.current) return;
              const left = track.current.scrollLeft;
              const cards = Array.from(track.current.children) as HTMLElement[];
              const nearest = cards.reduce(
                (best, card, i) =>
                  Math.abs(card.offsetLeft - left) <
                  Math.abs(cards[best].offsetLeft - left)
                    ? i
                    : best,
                0,
              );
              setIndex(nearest);
            }}
          >
            {items.map((review) => (
              <article key={review.id} className="review-card">
                <div
                  aria-label={`${review.rating} de 5 estrelas`}
                  role="img"
                  className="review-stars"
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote>“{review.text}”</blockquote>
                <strong>{review.name}</strong>
                <p>Casa 77 · {review.unit}</p>
                <a
                  className="review-source"
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver no Google: avaliação de ${review.name}`}
                >
                  Ver no Google <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <div className="review-controls">
            <button
              className="icon-button"
              aria-label="Avaliação anterior"
              onClick={() => move(-1)}
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite" aria-atomic="true">
              {index + 1} / {items.length}
            </span>
            <button
              className="icon-button"
              aria-label="Próxima avaliação"
              onClick={() => move(1)}
            >
              <ArrowRight />
            </button>
          </div>
          <p className="reviews-updated">
            Trechos de avaliações públicas no Google.
          </p>
        </div>
      </div>
    </section>
  );
}
