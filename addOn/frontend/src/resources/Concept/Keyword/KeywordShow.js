import React from 'react';
import { ChipField, SingleFieldList } from 'react-admin';
import { Grid } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import KeywordTitle from './KeywordTitle';
import { MarkdownField } from '../../../common/field';
import { MainList, SideList } from '../../../common/list';
import Show from "../../../layout/show/Show";

const KeywordShow = props => (
  <Show title={<KeywordTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Agent" source="pair:hasTopic">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default KeywordShow;
