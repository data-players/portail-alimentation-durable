import React from 'react';
import { Datagrid, ShowButton, ChipField, TextField } from 'react-admin';
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import { Link, makeStyles } from '@material-ui/core';
import { ReferenceArrayField, ReferenceField } from '@semapps/field-components';
import ChipList from '../../common/list/ChipList';


const useStyles = makeStyles(theme => ({
  description: { 
    maxHeight: '40px', 
    overflow: 'hidden', 
    display: "block"
  },
}));

const CustomUrlField = ({record, source}) => {
  if (!record[source]) return (
    <TextField source="pair:label" style={{color: "#026a63"}} />
  )

  return(
    <Link href={record[source]} color="primary" target="_blank" underline="hover" >{record["pair:label"]}</Link>
  )
}

const ResourceList = props => {
  const style = useStyles();
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <Datagrid >
          <CustomUrlField source="pair:homePage" />
          <TextField source="pair:description" className={style.description} />
          <ReferenceField label="Source de donnée" source="pair:hasDatasource" reference="Datasource">
              <ChipField source="pair:label" />
          </ReferenceField> 
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show"  externalLinks />
          </ReferenceArrayField>
          {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
