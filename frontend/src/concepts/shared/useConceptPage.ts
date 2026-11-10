import { useEffect } from "react";

interface Options {
  title: string;
  /** Google Fonts css2 query, e.g. "family=Archivo:wght@400;700" */
  fonts: string;
  /** Painted on <body> so overscroll and page edges match the concept. */
  background: string;
}

/** Loads a concept's fonts and page chrome, and restores the previous state on unmount. */
export function useConceptPage({ title, fonts, background }: Options) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;
    document.head.appendChild(link);

    const prevTitle = document.title;
    const prevBackground = document.body.style.backgroundColor;
    document.title = title;
    document.body.style.backgroundColor = background;
    window.scrollTo(0, 0);

    return () => {
      link.remove();
      document.title = prevTitle;
      document.body.style.backgroundColor = prevBackground;
    };
  }, [title, fonts, background]);
}
