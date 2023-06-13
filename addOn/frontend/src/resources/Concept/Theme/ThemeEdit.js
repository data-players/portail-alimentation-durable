import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import Edit from "../../../layout/edit/Edit";
import ThemeTitle from './ThemeTitle';
import { ReferenceInput } from '@semapps/input-components';
import TreeAutocompleteInput from '../../../common/input/TreeAutocompleteInput';


export const ThemeEdit = props => (
  <Edit title={<ThemeTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
      </FormTab>
      <FormTab label="Thème Parent">
        <ReferenceInput label="Thème Parent" reference="Theme" source="pair:broader" >
          <TreeAutocompleteInput optionText="pair:label" source="pair:broader" {...props} />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ThemeEdit;
