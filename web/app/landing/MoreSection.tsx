import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { THEMES, themeUrl } from "./content";

export function MoreSection() {
  return (
    <section
      className="landing-more"
      id="mais"
      aria-labelledby="more-title"
    >
      <p className="eyebrow">04 / Seu ambiente</p>
      <h2 id="more-title">Leve para suas ferramentas.</h2>
      <p className="more-intro">Comece por uma peça. Cada guia mostra como instalar na sua ferramenta.</p>
      <div className="more-list">
        {THEMES.map((item) => (
          <a
            key={item.name}
            data-cursor="button"
            href={themeUrl(item.path)}
            target="_blank"
            rel="noreferrer"
          >
            <span>{item.role}</span>
            <strong>{item.name}</strong>
            <span>{item.detail}</span>
            <span aria-hidden="true">
              <ArrowUpRightIcon size={22} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
