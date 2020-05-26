import { intervalToDuration } from 'date-fns';
import { isBefore } from 'date-fns/esm';

export function formatIntervalFromDate(start, end) {
	end.setDate(start.getDate());
	end.setMonth(start.getMonth());
	const duration = intervalToDuration({
		start,
		end,
	});

	if (isBefore(end, start)) {
		return null;
	}

	return `${duration.hours} hours`;
}

export function formatDurationToBr(duration) {
	return duration.replace('hours', 'horas');
}
