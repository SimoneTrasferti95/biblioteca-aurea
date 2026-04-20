export function formatDate(value: string, language = "it") {
  return new Date(value).toLocaleDateString(language, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}