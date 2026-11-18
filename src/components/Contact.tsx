import { useState, type FormEvent } from "react";
import { contact, profile } from "../content";
import { Icon } from "./Icon";
import "./Contact.css";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(profile.contactFormUrl, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form service answered ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access can be blocked; the address is still visible and selectable. */
    }
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact-intro">
          <h2 className="section-title" id="contact-title">
            {contact.heading}
          </h2>
          <p className="contact-lede">{contact.intro}</p>

          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" className="contact-copy" onClick={copyEmail}>
              <Icon name={copied ? "check" : "copy"} size={16} />
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>

          <ul className="contact-links">
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={sendMessage}>
          <div className="field">
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="contact-email">Your email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows={5} required />
          </div>

          <button type="submit" className="button button-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending message" : "Send message"}
          </button>

          <p className="form-status" role="status" data-status={status}>
            {status === "sent" && "Message sent. I'll reply to your email address."}
            {status === "error" && (
              <>
                The message didn't send. Check your connection and try again, or email{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
