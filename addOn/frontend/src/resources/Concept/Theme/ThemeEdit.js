import React from 'react';
import { FormTab, TabbedForm, TextInput, useGetList, choices } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import Edit from "../../../layout/edit/Edit";
import ThemeTitle from './ThemeTitle';
import { ReferenceInput } from '@semapps/input-components';
import TreeAutocompleteInput from '../../../common/input/TreeAutocompleteInput';

export const ThemeEdit = props => {
  const themes = Object.entries(useGetList("Theme", { page: 1, perPage: Infinity }))[1][1].filter((theme => theme !== props.id));;
  
  return (
    <Edit title={<ThemeTitle />} {...props}>
      <TabbedForm redirect="show">
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput multiline source="pair:description" fullWidth />
        </FormTab>
        <FormTab label="Thème Parent">
          <ReferenceInput label="Thème Parent" reference="Theme" source="pair:broader" >
            <TreeAutocompleteInput 
              optionText="pair:label" 
              treeReference="Theme" 
              parentProperty="pair:broader" 
              resettable={true} 
              shouldRenderSuggestions={value => false} 
              defaultExpanded={true}
              validate={choices(themes, `La selection ne peut pas être l'élément courant`)}
            />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ThemeEdit;
