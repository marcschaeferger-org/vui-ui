import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export function getExpirationString(expirationDate: string): string {
  const currentDateTime = dayjs(); // Current date and time
  const eventDateTime = dayjs.utc(expirationDate); // Event date in UTC format

  const isEventPast = eventDateTime.isBefore(currentDateTime);
  const timeDifferenceInMilliseconds = Math.abs(eventDateTime.diff(currentDateTime));

  const formattedDuration = dayjs.duration(timeDifferenceInMilliseconds).humanize();
  return isEventPast ? `${formattedDuration} ago` : `${formattedDuration}`;
}
