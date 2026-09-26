"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { MouseEvent } from "react";

type SiteHeaderProps = {
  onExplore: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function SiteHeader({ onExplore }: SiteHeaderProps) {
  return (
    <header>
      <a className="wordmark" href="#inicio" aria-label="Aroli, início">
        <img src="/aroli-lockup.svg" width="140" height="40" alt="Aroli" />
      </a>
      <a data-cursor="button" href="#theme-vscode" className="header-link" onClick={onExplore}>
        Explore o ambiente{" "}
        <span aria-hidden="true">
          <ArrowUpRightIcon size={13} />
        </span>
      </a>
    </header>
  );
}
