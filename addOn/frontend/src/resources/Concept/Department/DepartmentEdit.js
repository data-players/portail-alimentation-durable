import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import Edit from "../../../layout/edit/Edit";
import DepartmentTitle from './DepartmentTitle';

export const DepartmentEdit = props => (
  <Edit title={<DepartmentTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:departmentNb" fullWidth />
        <TextInput source="pair:region" fullWidth />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default DepartmentEdit;
