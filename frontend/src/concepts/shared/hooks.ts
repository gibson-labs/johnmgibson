import { useEffect, useState } from "react";
import { PROFILE } from "../content";

/** Live clock for a time zone, e.g. "7:12 PM MST". Ticks every 15s. */
export function useLocalTime(timeZone: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(now);
}

/** Copies the email address, falling back to mailto: where clipboard access is blocked. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return { copied, copy };
}

/** Body scroll lock + Escape-to-close while a modal/drawer is open. */
export function useModal(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
}
