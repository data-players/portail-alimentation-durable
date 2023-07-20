import React from 'react';
import Create from "../../../layout/create/Create";
import { SimpleForm, TextInput } from 'react-admin';

const KeyWordPadCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:label" label="Nom" fullWidth />
    </SimpleForm>
  </Create>
);

export default KeyWordPadCreate;
