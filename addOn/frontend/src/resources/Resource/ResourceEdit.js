import React from 'react';
import { FormTab, TabbedForm, TextInput, AutocompleteArrayInput, AutocompleteInput } from 'react-admin';
import { MarkdownInput,  } from '@semapps/markdown-components';
import { ReferenceArrayInput, ReferenceInput } from '@semapps/input-components';
import Edit from "../../layout/edit/Edit";
import ResourceTitle from './ResourceTitle';
import TreeAutocompleteArrayInput from '../../common/input/TreeAutocompleteArrayInput';

export const ResourceEdit = props => {
  return (
    <Edit title={<ResourceTitle />} {...props}>
      <TabbedForm redirect="show">
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput multiline source="pair:description" fullWidth />
          <TextInput source="pair:homePage" fullWidth/>
          <MarkdownInput label="Commentaire" source="pair:comment" fullWidth />
        </FormTab>
        <FormTab label="Relations">
          <ReferenceArrayInput label="Mots clefs" reference="Keyword" source="pair:hasKeyword" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Mots clefs du portail" reference="KeyWordPad" source="pair:hasKeyWordPad" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Thèmes" reference="Theme" source="pair:hasTopic" >
            <TreeAutocompleteArrayInput
              optionText="pair:label"
              parentProperty="pair:broader"
              treeReference="Theme"
              source="pair:hasTopic"
              // shouldRenderSuggestions={value => false} 
              defaultExpanded={true}
              fullWidth
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Département" reference="Department" source="pair:hasDepartment" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceArrayInput>
          <ReferenceInput label="Source de donnée" reference="Datasource" source="pair:hasDataSource" >
            <AutocompleteInput optionText="pair:label" fullWidth />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ResourceEdit;
