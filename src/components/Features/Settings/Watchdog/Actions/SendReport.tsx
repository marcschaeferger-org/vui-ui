'use client';

import { Button } from '@mantine/core';

interface SendReportProps {
  requestSendReport: (params: { url: string }) => void;
  fetching?: boolean;
}

export default function SendReport({ requestSendReport, fetching = false }: SendReportProps) {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        requestSendReport({ url: '/v1/watchdog/send-report' });
      }}
      disabled={fetching}
      aria-label="ActionIcon with size as a number"
      h={38}
      radius="md"
    >
      Send Report
    </Button>
  );
}
