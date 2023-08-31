import React from 'react';
import { ReferenceArrayField as RaReferenceArrayField, useRecordContext, RecordContextProvider } from 'react-admin';

const ReferenceArrayField = ({ source, ...otherProps }) => {
  const record = otherProps.record;
  if (!Array.isArray(record[source]) && record[source] !== undefined) {record[source] = [record[source]]}
  if (record?.[source]) {
    if (!Array.isArray(record[source])) {
      record[source] = [record[source]];
    }
    record[source] = record[source].map(i => i['@id'] || i.id || i);
  }
  return (
    <RecordContextProvider value={record}>
      <RaReferenceArrayField source={source} {...otherProps} />
    </RecordContextProvider>
  );
};

export default ReferenceArrayField;
