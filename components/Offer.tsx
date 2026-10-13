import Reveal from "@/components/Reveal";
import { membership, slots, steps } from "@/content/site";
import styles from "./Offer.module.css";

export function Membership() {
  return (
    <section className={`${styles.offer} wrap`} id="membresia" aria-labelledby="membresia-title">
      <div className={styles.lead}>
        <p className="eyebrow">Membresía</p>
        <h2 id="membresia-title">Un solo servicio, hecho por completo</h2>
        <div className={styles.price}>{membership.price}<small>/ mes</small></div>
        <p className="mute">{membership.note}</p>
      </div>
      <div>
        <Reveal as="ul" className={styles.list}>
          {membership.items.map((it, i) => (
            <li key={it.title}>
              <span>{String.fromCharCode(97 + i)}.</span>
              <div><h3>{it.title}</h3><p className="mute">{it.text}</p></div>
            </li>
          ))}
        </Reveal>
        <p className={`${styles.extra} mute`}>{membership.extra}</p>
      </div>
    </section>
  );
}

export function Slots() {
  return (
    <section className={`${styles.slots} wrap`} id="plazas" aria-labelledby="plazas-title">
      <p className="eyebrow">Capacidad</p>
      <div className={styles.big} aria-hidden="true">{slots.total}</div>
      <h2 id="plazas-title">{slots.title}</h2>
      <p className="mute">{slots.text}</p>
    </section>
  );
}

export function Process() {
  return (
    <section className={`${styles.process} wrap`} aria-labelledby="proceso-title">
      <p className="eyebrow">Cómo se entra</p>
      <h2 id="proceso-title">Cuatro pasos, todos por escrito</h2>
      <Reveal className={styles.steps}>
        {steps.map((s, i) => (
          <div key={s.title}><b>{i + 1} · {s.title}</b><p className="mute">{s.text}</p></div>
        ))}
      </Reveal>
    </section>
  );
}
