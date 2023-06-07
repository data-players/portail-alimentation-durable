import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import KeywordTitle from './KeywordTitle';

export const KeywordEdit = props => (
  <Edit title={<KeywordTitle />} {...props}>
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

export default KeywordEdit;
