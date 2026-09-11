import { Header } from "@/components/header";
import { HeroScrollExperience } from "@/components/hero-scroll-experience";
import { MotionProvider } from "@/components/motion-provider";
import { AboutSection } from "@/components/about-section";
import { TeamSection } from "@/components/team-section";
import { UnitsSection } from "@/components/units-section";
import { MembershipSection } from "@/components/membership-section";
import { ReviewsSection } from "@/components/reviews-section";
import { FinalCTA, Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/content/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    ...(site.url ? { url: site.url } : {}),
    sameAs: [site.instagram, site.linktree],
    areaServed: {
      "@type": "City",
      name: "Barreiras",
      containedInPlace: { "@type": "State", name: "Bahia" },
    },
  };
  return (
    <>
      <Header />
      <MotionProvider>
        <main id="conteudo">
          <HeroScrollExperience />
          <div className="brand-strip" aria-hidden="true">
            <span>ESTILO</span>
            <span>+</span>
            <span>IDENTIDADE</span>
            <span>+</span>
            <span>ATITUDE</span>
            <span>+</span>
            <span>CASA 77</span>
            <span>+</span>
            <span>ESTILO</span>
            <span>+</span>
            <span>IDENTIDADE</span>
          </div>
          <AboutSection />
          <TeamSection />
          <UnitsSection />
          <MembershipSection />
          <ReviewsSection />
          <FinalCTA />
        </main>
        <Footer />
      </MotionProvider>
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
