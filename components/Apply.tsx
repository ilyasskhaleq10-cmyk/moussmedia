import WaitlistForm from "@/components/WaitlistForm";
import { site } from "@/content/site";
import styles from "./Apply.module.css";

export default function Apply() {
  return (
    <section className={`${styles.apply} wrap`} id="solicitud" aria-labelledby="solicitud-title">
      <div className={styles.intro}>
        <p className="eyebrow">Lista de espera</p>
        <h2 id="solicitud-title">Tu marca,<br /><em>en la lista.</em></h2>
        <p className="mute">Revisamos cada solicitud a mano. Si encajamos, te escribimos por correo para agendar la videollamada.</p>
        <div className={styles.contact}>
          <span className="mute">¿Prefieres hablar directamente?</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </div>
      </div>
      <WaitlistForm />
    </section>
  );
}
