export function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
