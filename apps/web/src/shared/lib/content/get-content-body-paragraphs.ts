export const getContentBodyParagraphs = (body: string): string[] => {
  return body
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
