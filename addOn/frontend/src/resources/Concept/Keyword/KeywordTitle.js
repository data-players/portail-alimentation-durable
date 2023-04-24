import React from 'react';

const KeywordTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default KeywordTitle;
