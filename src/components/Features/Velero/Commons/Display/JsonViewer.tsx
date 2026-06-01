'use client';

import { Center, Loader } from '@mantine/core';

import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';

import 'react-json-view-lite/dist/index.css';

type JsonValue = string | number | boolean | null | undefined | JsonValue[] | { [key: string]: JsonValue };

interface DetailProps {
  record: JsonValue;
}

export function JsonViewer({ record }: DetailProps) {
  if (record === undefined) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      <JsonView
        data={(record as Object | any[]) ?? {}}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  );
}
