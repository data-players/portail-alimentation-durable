import React from 'react';
import { FormTab, TabbedForm, TextInput, SelectInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import ThemeTitle from './ThemeTitle';
import { ReferenceInput } from '@semapps/input-components';
import CustomReferenceinput from '../../../common/input/CustomReferenceinput';


export const ThemeEdit = props => (
  <Edit title={<ThemeTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
      </FormTab>
      <FormTab label="Thème Parent">
        {/* <AgentsInput source="pair:topicOf" /> */}
        {/* <ReferenceInput label="Thème Parent" reference="Theme" source="pair:broader" >
          <SelectInput optionText="pair:label" />
        </ReferenceInput> */}
       <CustomReferenceinput />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ThemeEdit;
