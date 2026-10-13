"use client";

import { useState } from "react";
import { form as opts, site } from "@/content/site";
import styles from "./WaitlistForm.module.css";

type Data = Record<string, string>;
const required = ["marca", "sector", "presupuesto", "inicio", "nombre", "cargo", "email", "telefono"];
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOk = (v: string) => /^[+\d][\d\s.-]{7,}$/.test(v.trim());

// Solicitud de lista de espera. Envía JSON por POST a site.waitlistEndpoint (app.moussmedia.com)
export default function WaitlistForm() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [budget, setBudget] = useState("");

  const validate = (d: Data) => {
    const e: Record<string, boolean> = {};
    required.forEach((k) => { if (!d[k] || d[k].trim().length < 2) e[k] = true; });
    if (d.email && !emailOk(d.email)) e.email = true;
    if (d.telefono && !phoneOk(d.telefono)) e.telefono = true;
    if (d.privacidad !== "acepto") e.privacidad = true;
    return e;
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data = Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v)])) as Data;
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      (ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch(site.waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, origen: "web-moussmedia", enviado: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("ok");
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form: "lista_espera" });
    } catch {
      setState("fail");
    }
  }

  if (state === "ok") {
    return (
      <div className={styles.ok} role="status">
        <h3>Solicitud recibida</h3>
        <p className="mute">Gracias. Revisaremos tu marca y te escribiremos por correo si encajamos con las plazas disponibles.</p>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? styles.error : "");

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <fieldset>
        <legend>Tu marca</legend>
        <div className={styles.row}>
          <Field k="marca" label="Marca o empresa *" cls={err("marca")} msg="Escribe el nombre de tu marca."><input id="f-marca" name="marca" autoComplete="organization" /></Field>
          <Field k="sector" label="Sector *" cls={err("sector")} msg="Elige tu sector."><Select id="f-sector" name="sector" options={opts.sectors} /></Field>
        </div>
        <div className={styles.row}>
          <Field k="instagram" label="Instagram"><input id="f-instagram" name="instagram" placeholder="@tumarca" /></Field>
          <Field k="seguidores" label="Seguidores"><Select id="f-seguidores" name="seguidores" options={opts.followers} /></Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Inversión y plazos</legend>
        <div className={styles.row}>
          <Field k="presupuesto" label="Presupuesto mensual *" cls={err("presupuesto")} msg="Indica tu presupuesto.">
            <Select id="f-presupuesto" name="presupuesto" options={opts.budgets} onChange={(e) => setBudget(e.target.value)} />
          </Field>
          <Field k="inicio" label="¿Cuándo quieres empezar? *" cls={err("inicio")} msg="Indica cuándo quieres empezar."><Select id="f-inicio" name="inicio" options={opts.start} /></Field>
        </div>
        {budget === opts.budgets[0] && (
          <p className={styles.fit}>Nuestra membresía empieza en 1.500 € al mes. Puedes enviar la solicitud igualmente y te avisaremos si abrimos otro formato.</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Quién decide</legend>
        <div className={styles.row}>
          <Field k="nombre" label="Nombre *" cls={err("nombre")} msg="Escribe tu nombre."><input id="f-nombre" name="nombre" autoComplete="name" /></Field>
          <Field k="cargo" label="Cargo *" cls={err("cargo")} msg="Indica tu cargo."><Select id="f-cargo" name="cargo" options={opts.roles} /></Field>
        </div>
        <div className={styles.row}>
          <Field k="email" label="Email *" cls={err("email")} msg="Escribe un email válido."><input id="f-email" name="email" type="email" autoComplete="email" /></Field>
          <Field k="telefono" label="Teléfono *" cls={err("telefono")} msg="Escribe un teléfono válido."><input id="f-telefono" name="telefono" type="tel" autoComplete="tel" /></Field>
        </div>
        <Field k="mensaje" label="¿Qué quieres transmitir con tu marca?"><textarea id="f-mensaje" name="mensaje" rows={3} /></Field>
      </fieldset>

      <label className={`${styles.check} ${errors.privacidad ? styles.checkErr : ""}`}>
        <input type="checkbox" id="f-privacidad" name="privacidad" value="acepto" />
        <span>He leído y acepto la <a href="/legal.html#privacidad">política de privacidad</a>.</span>
      </label>

      {state === "fail" && (
        <p className={styles.failMsg} role="alert">
          No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos a {site.email}.
        </p>
      )}
      <div><button className="btn solid" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar solicitud"}</button></div>
    </form>
  );
}

function Field({ k, label, cls = "", msg, children }: { k: string; label: string; cls?: string; msg?: string; children: React.ReactNode }) {
  return (
    <div className={`${styles.f} ${cls}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {children}
      {msg && <span className={styles.msg}>{msg}</span>}
    </div>
  );
}

function Select({ id, name, options, onChange }: { id: string; name: string; options: string[]; onChange?: React.ChangeEventHandler<HTMLSelectElement> }) {
  return (
    <select id={id} name={name} defaultValue="" onChange={onChange}>
      <option value="">Elige una opción</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
