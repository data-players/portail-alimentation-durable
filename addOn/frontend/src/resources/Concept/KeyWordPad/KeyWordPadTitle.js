import React from 'react';

const KeyWordPadTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default KeyWordPadTitle;
