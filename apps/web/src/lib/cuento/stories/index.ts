import type { CuentoStory } from "../types";
import { yachaySombra } from "./yachay-sombra";

export const cuentos: Record<string, CuentoStory> = {
  [yachaySombra.slug]: yachaySombra,
};

export function getCuento(slug: string): CuentoStory | null {
  return cuentos[slug] ?? null;
}
