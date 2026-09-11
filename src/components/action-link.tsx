"use client";

import { ArrowUpRight, MessageCircle, Smartphone } from "lucide-react";
import type { ReactNode } from "react";
import { site, messages, whatsappUrl } from "@/content/site";
import { track, type EventName } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  className?: string;
  message?: string;
  phone?: string | null;
  source: string;
  app?: boolean;
  event?: EventName;
  subtle?: boolean;
};
export function ActionLink({
  children,
  className,
  message = messages.general,
  phone,
  source,
  app,
  event,
  subtle,
}: Props) {
  return (
    <a
      className={cn(subtle ? "text-link" : "button", className)}
      aria-label={
        typeof children === "string"
          ? children
          : app
            ? "Agendar pelo aplicativo"
            : "Falar no WhatsApp"
      }
      href={app ? site.app : whatsappUrl(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track(app ? "app_click" : "whatsapp_click", { source });
        if (event) track(event, { source });
      }}
    >
      {app ? <Smartphone size={16} /> : <MessageCircle size={16} />}
      <span>
        {children || (app ? "Agendar pelo app" : "Falar no WhatsApp")}
      </span>
      <ArrowUpRight size={17} className="action-arrow" />
    </a>
  );
}
