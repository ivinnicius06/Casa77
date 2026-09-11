import { ArrowUpRight, Check, Plus, Scissors } from "lucide-react";
import { plans, messages } from "@/content/site";
import { ActionLink } from "./action-link";

export function MembershipSection() {
  return (
    <section id="assinaturas" className="membership-section section-pad">
      <div className="section-kicker" data-reveal>
        <span>04 / CLUB 77</span>
        <span>
          SEU ESTILO NÃO TIRA FOLGA <Plus size={14} />
        </span>
      </div>
      <div className="membership-heading" data-reveal>
        <div>
          <span className="club-word">
            CLUB <b>77</b>
            <Scissors size={24} />
          </span>
          <h2>
            Seu estilo.
            <br />
            <span className="outline-word">Sempre em dia.</span>
          </h2>
        </div>
        <div>
          <p>
            Conheça os planos da primeira barbearia
            <br className="desktop-break" /> por assinatura da região.
          </p>
          <span className="membership-proof">
            <span className="status-dot" /> MAIS DE 300 PESSOAS JÁ SÃO DA CASA.
          </span>
        </div>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`plan-card ${plan.recommended ? "plan-featured" : ""}`}
            data-reveal
          >
            <div className="plan-top">
              <span>CLUB 77 / {plan.id}</span>
              {plan.recommended ? (
                <span className="plan-badge">
                  {plan.provisional ? "PRÉVIA" : "RECOMENDADO"}
                </span>
              ) : (
                <Plus size={18} />
              )}
            </div>
            <h3>{plan.name}</h3>
            <p className="plan-label">{plan.label}</p>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              {plan.price !== null ? (
                <>
                  <strong>
                    {plan.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <small>/ mês</small>
                </>
              ) : (
                <>
                  <strong>Sob consulta</strong>
                  <small>Conheça as opções com a equipe</small>
                </>
              )}
            </div>
            {plan.benefits.length > 0 ? (
              <ul className="plan-benefits">
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check size={16} />
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="plan-pending">
                Nome, serviços e condições
                <br />
                aguardando confirmação.
              </p>
            )}
            <ActionLink
              source={`plan-${plan.id}`}
              message={messages.plan(plan.provisional ? undefined : plan.name)}
              event="plan_interest"
              className={plan.recommended ? "button-orange" : "button-outline"}
            >
              Quero ser assinante
            </ActionLink>
            {plan.provisional && (
              <small className="provisional">
                Apresentação provisória do plano
              </small>
            )}
          </article>
        ))}
      </div>
      <ol className="membership-steps" data-reveal>
        {[
          "Escolha seu plano",
          "Fale com a equipe",
          "Agende pelo aplicativo",
          "Mantenha seu estilo",
        ].map((step, i) => (
          <li key={step}>
            <span>0{i + 1}</span>
            <p>{step}</p>
            {i < 3 && <ArrowUpRight size={17} />}
          </li>
        ))}
      </ol>
    </section>
  );
}
