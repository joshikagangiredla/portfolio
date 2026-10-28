"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteImage } from "@/lib/content";

// ClanAway "Try it out": switch the logo between its light and dark versions.
export default function LogoToggle({ light, dark }: { light: SiteImage; dark: SiteImage }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <figure className="logo-toggle">
      <div className="logo-toggle__panel">
        <div className="logo-toggle__stage">
          {[
            { key: "light", image: light },
            { key: "dark", image: dark },
          ].map(({ key, image }) =>
            image.exists ? (
              <Image key={key} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="360px" hidden={mode !== key} />
            ) : (
              <div key={key} className="placeholder" role="img" aria-label={image.alt} hidden={mode !== key}>
                <span aria-hidden="true">{key} logo</span>
              </div>
            ),
          )}
        </div>
        <div className="logo-toggle__switch" role="group" aria-label="Logo version">
          {(["light", "dark"] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === "light" ? "Light mode" : "Dark mode"}
            </button>
          ))}
        </div>
      </div>
      <figcaption>Light and dark logo</figcaption>
    </figure>
  );
}
