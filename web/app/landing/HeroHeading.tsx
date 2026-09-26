"use client";

import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import type { MouseEvent } from "react";
import { REPO } from "./content";

type HeroHeadingProps = {
  onExplore: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroHeading({ onExplore }: HeroHeadingProps) {
  return (
    <div className="landing-heading">
      <span className="hero-kicker">Um ambiente. Cada detalhe.</span>
      <h1>
        Tudo encontra
        <br />
        seu lugar.
      </h1>
      <p>
        Temas para suas ferramentas de desenvolvimento. Uma fonte para o código.
        Um ponteiro para cada gesto. Tudo na mesma linguagem.
      </p>
      <div className="hero-actions">
        <a data-cursor="button" href="#theme-vscode" className="cta" onClick={onExplore}>
          Explorar os temas{" "}
          <span aria-hidden="true">
            <ArrowDownIcon size={14} />
          </span>
        </a>
        <a data-cursor="button" className="hero-source" href={REPO} target="_blank" rel="noreferrer">
          Código fonte{" "}
          <span aria-hidden="true">
            <ArrowUpRightIcon size={14} />
          </span>
        </a>
      </div>
      <a className="hero-download" href="#mais">Escolher o que instalar ↗</a>
    </div>
  );
}
