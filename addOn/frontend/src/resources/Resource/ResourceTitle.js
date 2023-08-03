import React from 'react';

const ResourceTitle = ({ record }) => {
  return <span style={{ maxWidth: '1250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: "block" }}>{record ? record['pair:label'] : ''}</span>;
};

export default ResourceTitle;
