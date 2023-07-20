import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import Edit from "../../../layout/edit/Edit";
import KeyWordPadTitle from './KeyWordPadTitle';

export const KeyWordPadEdit = props => (
  <Edit title={<KeyWordPadTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
      </FormTab>
      {/* <FormTab label="Relations">
        <AgentsInput source="pair:hasTopic" />
      </FormTab> */}
    </TabbedForm>
  </Edit>
);

export default KeyWordPadEdit;
