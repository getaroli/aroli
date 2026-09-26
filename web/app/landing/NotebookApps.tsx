import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { NOTEBOOK_APPS, themeGuideUrl } from "./content";

export function NotebookApps() {
  return (
    <div className="notebook-apps" id="temas">
      {NOTEBOOK_APPS.map((app) => (
        <section className={`notebook-app app-${app.id}`} id={`theme-${app.id}`} key={app.id}>
          <p className="eyebrow">Aroli Themes / {app.role}</p>
          <h2>Suas ferramentas, em sintonia.</h2>
          <a href={themeGuideUrl(app.id)} target="_blank" rel="noreferrer">
            Aroli para {app.name} <ArrowUpRightIcon size={16} aria-hidden="true" />
          </a>
          <div className="linear-capture">
            <Image src={`/examples/${app.id}.png`} alt={`Paleta preservada do tema para ${app.name}; captura da geração anterior`} width={1920} height={1046} sizes="(max-width: 760px) 88vw, 80vw" />
          </div>
        </section>
      ))}
    </div>
  );
}
