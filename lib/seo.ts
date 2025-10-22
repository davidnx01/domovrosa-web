export function generateSeoDescription(html: string, maxLength = 160): string {
  if (!html) return "";

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLength
    ? text.slice(0, text.lastIndexOf(" ", maxLength)) + "…"
    : text;
}
