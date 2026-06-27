import { getDurationDetails, getDurationInMilliseconds } from '@/utils/getDurationDetails';
import { Text, Tooltip } from '@mantine/core';

export function get_duration(status: any) {
  if (status?.startTimestamp && status?.completionTimestamp) {
    const ms = getDurationInMilliseconds(status.startTimestamp, status.completionTimestamp);
    const { humanDuration, durationHHmmss } = getDurationDetails(ms);
    return (
      <Tooltip label={durationHHmmss} offset={5}>
        <Text size="sm">{humanDuration}</Text>
      </Tooltip>
    );
  }
  return null;
}
