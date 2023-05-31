import React from 'react';
import { FormTab, TabbedForm, TextInput, ReferenceInput, AutocompleteArrayInput } from 'react-admin';
import { MarkdownInput,  } from '@semapps/markdown-components';
import Edit from "../../layout/edit/Edit";
import ResourceTitle from './ResourceTitle';
import ReferenceTreeInput from '../../common/input/ReferenceTreeInput';

export const ResourceEdit = props => {
  return (
    <Edit title={<ResourceTitle />} {...props}>
      <TabbedForm redirect="show">
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput multiline source="pair:description" fullWidth />
        </FormTab>
        <FormTab label="Thématiques">
          <ReferenceInput label="Mots Clefs" reference="Keyword" source="pair:hasKeyword" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth />
          </ReferenceInput>
          {/* <ReferenceInput label="Thème" reference="Theme" source="pair:topicOf" >
            <AutocompleteArrayInput optionText="pair:label" fullWidth {...props} />
          </ReferenceInput> */}
          <ReferenceInput label="Sujet de" reference="Theme" source="pair:hasTopic" style={{display: "flex"}} >
            <ReferenceTreeInput {...props} />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ResourceEdit;
