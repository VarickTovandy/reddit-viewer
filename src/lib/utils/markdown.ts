export function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function htmlToText(html: string): string {
  if (!html) return '';
  
  let text = decodeHTMLEntities(html);
  text = stripHTML(text);
  text = text.trim();
  
  return text;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function hasSpoilers(text: string): boolean {
  return text.includes('>!') && text.includes('!<');
}

export function extractLinks(markdown: string): string[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: string[] = [];
  let match;
  
  while ((match = linkRegex.exec(markdown)) !== null) {
    links.push(match[2]);
  }
  
  return links;
}

export function cleanSelftext(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}