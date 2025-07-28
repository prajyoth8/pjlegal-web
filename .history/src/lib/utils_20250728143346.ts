// src/lib/utils.ts
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Optional: Add other utility functions you might need
export function truncateText(text: string, maxLength: number = 150): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}