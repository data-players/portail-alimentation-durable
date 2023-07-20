import React from 'react';
import { SingleFieldList, ChipField, UrlField } from 'react-admin';
import { Grid } from '@material-ui/core';
import { ReferenceArrayField } from '@semapps/field-components';
import ResourceTitle from './ResourceTitle';
import { MarkdownField } from '../../common/field';
import { MainList, SideList } from '../../common/list';
import Show from "../../layout/show/Show";

const ResourceShow = props => (
  <Show title={<ResourceTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <MainList>
          <MarkdownField source="pair:description" />
          <UrlField source="pair:homePage" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Keyword" source="pair:hasKeyword">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="KeyWordPad" source="pair:hasKeyWordPad">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Department" source="pair:hasDepartment">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Datasource" source="pair:hasDataSource">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default ResourceShow;
