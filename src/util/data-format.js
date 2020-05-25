import { format } from 'date-fns';

export function formatFromBrLocale(date) {
	return format(date, `dd/MM/yyyy'T'HH:mm:ss`);
}

export function formatToBrLocale(date) {
	return format(date, `yyyy-MM-dd'T'HH:mm:ss`);
}
