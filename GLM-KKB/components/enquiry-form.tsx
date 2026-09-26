"use client";

import { useState } from "react";

const TYPES = [
  { value: "gift-boxes", label: "Gift boxes" },
  { value: "corporate", label: "Corporate gifts" },
  { value: "custom", label: "Custom order" },
];

type Status = "idle" | "sending" | "success" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [active, setActive] = useState("gift-boxes");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/gift-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          company: String(data.get("company") ?? ""),
          enquiryType: String(data.get("enquiryType") ?? "gift-boxes"),
          message: String(data.get("message") ?? ""),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try WhatsApp.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-tan/40 bg-tan/5 p-8">
        <p className="label text-tan">Enquiry received</p>
        <p className="display-fluid mt-5 text-[clamp(1.6rem,3vw,2.4rem)] text-bone">
          Noted. We&apos;ll be in touch.
        </p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/60">
          Your enquiry is saved with the shop. If it&apos;s urgent, WhatsApp{" "}
          <a href="https://wa.me/27645986495" className="link-draw text-tan">
            +27 64 598 6495
          </a>{" "}
          and we&apos;ll cut it while you type.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label link-draw mt-8 text-bone/70"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="enquiryType" value={active} />

      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setActive(type.value)}
            className={`label border px-4 py-3 transition-colors duration-500 ${
              active === type.value
                ? "border-tan bg-tan text-ink"
                : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" autoComplete="tel" />
        <Field label="Company (optional)" name="company" />
      </div>

      <div>
        <label htmlFor="message" className="label mb-3 block text-bone/45">
          What are we building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Quantity, meats, budget, delivery date, branding…"
          className="w-full resize-none border border-bone/20 bg-transparent px-4 py-4 font-grotesk text-sm text-bone outline-none transition-colors duration-500 placeholder:text-bone/25 focus:border-tan"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-meat-2" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="label group inline-flex items-center gap-3 bg-bone px-8 py-4 text-ink transition-colors duration-500 hover:bg-tan disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Enquire about gifts"}
        <span className="cta-arrow">→</span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label mb-3 block text-bone/45">
        {label}
        {required ? <span className="text-tan"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-bone/20 bg-transparent px-4 py-4 font-grotesk text-sm text-bone outline-none transition-colors duration-500 placeholder:text-bone/25 focus:border-tan"
      />
    </div>
  );
}
