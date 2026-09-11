import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { ActionLink } from "@/components/action-link";
export const metadata = { title: "Privacidade | Casa 77" };
export default function Privacy() {
  return (
    <main className="privacy-page">
      <Link href="/" className="text-link">
        <ArrowLeft size={17} /> Voltar à Casa 77
      </Link>
      <span className="eyebrow">CASA 77 / TRANSPARÊNCIA</span>
      <h1>Privacidade.</h1>
      <p>
        Esta página descreve o funcionamento desta versão do site da {site.name}
        .
      </p>
      <h2>Navegação</h2>
      <p>
        O site não solicita cadastro, não tem formulário de coleta de dados e
        não instala ferramentas de publicidade ou analytics. O servidor de
        hospedagem pode registrar dados técnicos de acesso, de acordo com sua
        configuração.
      </p>
      <h2>Contato e agendamento</h2>
      <p>
        Os botões de contato levam ao WhatsApp, e os de agendamento levam ao
        aplicativo indicado pela Casa 77. Ao acessar esses serviços, as
        informações que você fornecer serão tratadas nesses canais, conforme as
        políticas dos respectivos responsáveis.
      </p>
      <h2>Links externos</h2>
      <p>
        Instagram, Google Maps e as lojas de aplicativos são serviços externos.
        A navegação nesses serviços está sujeita às suas próprias políticas de
        privacidade.
      </p>
      <h2>Sobre seus dados</h2>
      <p>
        Para esclarecer dúvidas sobre dados fornecidos à barbearia durante um
        atendimento ou agendamento, entre em contato com a equipe pelo canal
        oficial.
      </p>
      <ActionLink source="privacy">Falar com a Casa 77</ActionLink>
      <p className="privacy-date">Atualizado em setembro de 2026.</p>
    </main>
  );
}
