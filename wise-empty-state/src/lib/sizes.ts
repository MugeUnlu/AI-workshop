export const SIZE_CONFIG = {
  sm: { height: "h-8", px: "px-3", gap: "gap-1.5", text: "text-xs", icon: "size-3.5", square: "size-8" },
  pill: { height: "h-9", px: "px-3", gap: "gap-1.5", text: "text-sm", icon: "size-4", square: "size-9" },
  md: { height: "h-10", px: "px-4", gap: "gap-2", text: "text-sm", icon: "size-4", square: "size-10" },
  lg: { height: "h-12", px: "px-6", gap: "gap-2.5", text: "text-base", icon: "size-5", square: "size-12" },
} as const;

export type Size = keyof typeof SIZE_CONFIG;

/** Build a cva `size` variant map from chosen SIZE_CONFIG keys. */
export function sizeVariant<K extends keyof (typeof SIZE_CONFIG)["md"]>(...keys: K[]) {
  return Object.fromEntries(
    (Object.keys(SIZE_CONFIG) as Size[]).map((s) => [s, keys.map((k) => SIZE_CONFIG[s][k]).join(" ")])
  ) as Record<Size, string>;
}
