import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFD') // Normalize accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Collapse multiple hyphens
}

export function getExcerpt(html: string, length: number = 100): string {
    if (!html) return '';
    let text = html.replace(/<[^>]+>/g, '');
    text = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    text = text.replace(/\s+/g, ' ').trim();

    if (text.length > length) {
        return text.substring(0, length).trim() + '...';
    }
    return text;
}

export const truncate_text = (
    text: string,
    maxLength: number = 200,
): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
};
