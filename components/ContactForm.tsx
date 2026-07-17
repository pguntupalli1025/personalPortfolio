"use client";

import { useState, type FormEvent } from "react";

interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  "w-full border border-hairline bg-transparent px-3 py-2 font-mono text-sm text-fg outline-none transition-colors placeholder:text-dim focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent";

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>({
    status: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setState({
          status: "error",
          message: data.error ?? "Something went wrong.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Message sent. I'll get back to you soon.",
      });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs text-muted">
          name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={100}
          className={inputClass}
          placeholder="your name"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs text-muted">
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs text-muted">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className={`${inputClass} resize-none`}
          placeholder="what's up"
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="border border-accent bg-accent px-4 py-2 font-mono text-sm text-fg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === "loading" ? "sending..." : "send"}
      </button>

      {state.message ? (
        <p
          role="status"
          className={`text-xs ${
            state.status === "success" ? "text-fg" : "text-accent"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
