import { useEffect } from "react";

/**
 * Escuta a tecla Enter em nível de window e dispara o callback.
 * Ignora se o evento já foi tratado (defaultPrevented),
 * se a tecla está sendo segurada (repeat), ou se o foco
 * está em um elemento que trata Enter nativamente.
 */
export function useEnterKey(callback: () => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter" || e.repeat || e.defaultPrevented) return;

      const tag = (e.target as HTMLElement).tagName;
      if (tag === "BUTTON" || tag === "A" || tag === "TEXTAREA") return;

      e.preventDefault();
      callback();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}
