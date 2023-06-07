import React from 'react';

const DepartmentTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default DepartmentTitle;
