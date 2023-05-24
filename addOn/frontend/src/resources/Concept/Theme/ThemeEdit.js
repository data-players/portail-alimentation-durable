import React from 'react';
import { FormTab, TabbedForm, TextInput, SelectInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import ThemeTitle from './ThemeTitle';
import { ReferenceInput } from '@semapps/input-components';


export const ThemeEdit = props => (
  <Edit title={<ThemeTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <a href='https://mui.com/material-ui/material-icons/' style={{fontSize: "12px", paddingLeft: "15px"}}>Liste des icones Disponible ici, copiez son nom dans le champ</a>
      </FormTab>
      <FormTab label="Relations">
        <AgentsInput source="pair:topicOf" />
        <ReferenceInput label="Thème Parent" reference="Theme" source="pair:broader" >
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ThemeEdit;
