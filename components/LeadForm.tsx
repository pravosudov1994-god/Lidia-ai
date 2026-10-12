"use client";
import { FormEvent, useState } from "react";
export default function LeadForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setStatus("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""), phone: String(data.get("phone") || ""),
          niche: String(data.get("niche") || ""), website: String(data.get("website") || ""),
        }),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok || !result.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте позднее.");
      setStatus("Заявка отправлена. Команда Motin Group свяжется с вами."); form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    } finally { setPending(false); }
  }
  return (
    <form className="lead-form" onSubmit={submit}>
      <label>Ваше имя<input name="name" type="text" autoComplete="name" maxLength={80} placeholder="Как к вам обращаться?" required /></label>
      <label>Телефон<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+7 999 123-45-67" required /></label>
      <label>Ниша / задача<input name="niche" type="text" maxLength={300} placeholder="Чем занимается ваш бизнес?" /></label>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}><label>Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Отправляем…" : "Обсудить проект ↗"}</button>
      <div className="lead-form-status" role="status" aria-live="polite">{status}</div>
    </form>
  );
}