"use client";

import { useEffect, useState } from "react";
import { ActionLink } from "./action-link";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div hidden={!visible}>
      <ActionLink source="floating" className="floating-whatsapp">
        WhatsApp
      </ActionLink>
    </div>
  );
}
