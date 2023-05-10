import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ThemesInput, KeywordsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import ResourceTitle from './ResourceTitle';
import { ColorInput } from 'react-admin-color-input';

export const ResourceEdit = props => (
  <Edit title={<ResourceTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <TextInput label="Icone du thème" source="pair:icon" fullWidth />
        <ColorInput label="Couleur du thème" source="pair:color" />
      </FormTab>
      <FormTab label="Thématiques">
        <ThemesInput source="pair:topicOf" />
        <KeywordsInput source="pair:keywordOf" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ResourceEdit;
