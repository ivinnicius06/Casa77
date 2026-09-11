"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { ActionLink } from "./action-link";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="/#inicio"
      aria-label="Casa 77 — início"
    >
      <Image
        src="/images/logo.webp"
        alt=""
        width={48}
        height={48}
        priority={!footer}
      />
      <span>
        CASA <b>77</b>
        <small>BARBEARIA · BARREIRAS</small>
      </span>
    </a>
  );
}
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ActionLink source="header" className="header-cta">
          Agende seu horário
        </ActionLink>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="icon-button menu-toggle" aria-label="Abrir menu">
              <Menu size={24} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content
              className="mobile-menu"
              aria-describedby="menu-description"
            >
              <Dialog.Title className="sr-only">Navegação Casa 77</Dialog.Title>
              <Dialog.Description id="menu-description" className="sr-only">
                Explore a Casa 77 e agende seu horário.
              </Dialog.Description>
              <div className="mobile-menu-top">
                <Brand />
                <Dialog.Close className="icon-button" aria-label="Fechar menu">
                  <X />
                </Dialog.Close>
              </div>
              <nav aria-label="Navegação mobile">
                {site.nav.map((item, i) => (
                  <a
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>0{i + 1}</span>
                    {item.label}
                    <ArrowUpRight />
                  </a>
                ))}
              </nav>
              <ActionLink source="mobile-menu" />
              <p>
                Três unidades. Uma só identidade.
                <br />
                Barreiras, Bahia.
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <noscript>
        <nav className="nojs-nav">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
