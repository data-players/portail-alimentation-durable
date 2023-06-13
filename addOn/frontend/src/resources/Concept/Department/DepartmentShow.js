import React from 'react';
import { TextField } from 'react-admin';
import DepartmentTitle from './DepartmentTitle';
import Show from "../../../layout/show/Show";
import { MainList } from '../../../common/list';

const DepartmentShow = props => (
  <Show title={<DepartmentTitle />} {...props}>
    <MainList>
      <TextField source="pair:label" style={{fontSize: "30px", paddingLeft: "1%"}} />
      <TextField source="pair:region" style={{fontSize: "30px", paddingLeft: "1%"}} />
      <TextField source="pair:departmentNb" style={{fontSize: "30px", paddingLeft: "1%"}} />
    </MainList>
  </Show>
);

export default DepartmentShow;
