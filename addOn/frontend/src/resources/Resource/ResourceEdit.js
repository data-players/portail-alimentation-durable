import React from 'react';
import { FormTab, TabbedForm, TextInput, AutocompleteArrayInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import { MarkdownInput,  } from '@semapps/markdown-components';
import { ReferenceArrayInput } from '@semapps/input-components';
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
          <TextInput label="Commentaire" source="pair:comment" fullWidth />
        </FormTab>
        <FormTab label="Relations">
          <ReferenceInput label="Mots Clefs" reference="Keyword" source="pair:hasKeyword" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceInput>
          <ReferenceArrayInput label="Thèmes" reference="Theme" source="pair:hasTopic" fullWidth >
            <TreeAutocompleteArrayInput
              optionText="pair:label"
              parentProperty="pair:broader"
              treeReference="Theme"
              shouldRenderSuggestions={value => false} 
              defaultExpanded={true}
            />
          </ReferenceArrayInput>
          <ReferenceInput label="Département" reference="Department" source="pair:hasDepartment" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceInput>
          <ReferenceInput label="Source de donnée" reference="Datasource" source="pair:hasDatasource" >
            <AutocompleteInput optionText="pair:label" fullWidth />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ResourceEdit;
