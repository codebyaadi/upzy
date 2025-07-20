/**
 * Converts a name into a URL-friendly slug.
 * E.g. "Hello World!" => "hello-world"
 */
export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
