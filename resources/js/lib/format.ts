import { format } from 'date-fns';

const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');

    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const initial_name = (input?: string) => {
    return getInitials(input ?? '');
};

export const date_format = (date?: any, formatStr: string = 'default') => {
    if (formatStr != 'default') {
        return format(date, formatStr);
    }

    if (date == null) {
        return null;
    }

    return format(date, 'dd/MM/yyyy');
};

export const normalize_label = (input?: string) => {
    return (
        input
            ?.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char: any) => char.toUpperCase()) || ''
    );
};

export const currency_format = (
    input?: number | string,
    currency?: string,
): string => {
    const num = typeof input === 'string' ? parseFloat(input) : input;

    if (typeof num !== 'number' || isNaN(num)) return '0';

    return num.toLocaleString('id-ID', {
        style: 'currency',
        currency: currency ?? 'IDR',
        minimumFractionDigits: 0,
    });
};

export const tax_rate_format = (input?: number): string => {
    if (typeof input !== 'number' || isNaN(input)) return '0%';

    return `${(input / 100).toFixed(2)}%`;
};

export function count_percentage(value?: number, divider?: number) {
    if (value === undefined || divider === undefined || divider === 0) {
        return 0;
    }
    return ((value / divider) * 100).toFixed(2);
}

export const file_size_format = (
    bytes?: number,
    precision: number = 1,
): string => {
    if (bytes === undefined || bytes === null || bytes < 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(precision)} ${units[unitIndex]}`;
};

export const format_date = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(dateString));
};