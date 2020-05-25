import { intervalToDuration } from 'date-fns';

export function formatIntervalFromDate(start, end) {
	const duration = intervalToDuration({
		start,
		end,
	});

	return `${duration.hours} hours`;
}
