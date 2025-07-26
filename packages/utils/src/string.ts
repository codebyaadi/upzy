/**
 * Converts a name into a URL-friendly slug with a unique ID (Asynchronous).
 * Use this when your environment requires dynamic 'import()' for 'nanoid'
 * (e.g., a CommonJS module using nanoid v4+).
 * E.g. "My Blog Post" => "my-blog-post-a1b2c3d4e5"
 * @param name The input string to convert into a slug.
 * @returns A Promise that resolves to a URL-friendly slug with a unique nanoid appended.
 */
export async function generateSlug(name: string): Promise<string> {
  // Dynamically import nanoid. This makes the function asynchronous.
  // This is crucial for environments where 'nanoid' is an ESM module
  // and cannot be directly 'required' or statically 'imported'.
  const { customAlphabet } = await import("nanoid");

  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

  const slugFromName = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const uniqueId = nanoid();

  return `${slugFromName}-${uniqueId}`;
}
