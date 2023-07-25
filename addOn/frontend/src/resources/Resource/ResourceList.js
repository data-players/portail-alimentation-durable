import React from 'react';
import { Datagrid, ShowButton, ChipField, TextField } from 'react-admin';
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import { Link, makeStyles } from '@material-ui/core';
import { ReferenceArrayField, ReferenceField } from '@semapps/field-components';
import ChipList from '../../common/list/ChipList';

const useStyles = makeStyles(theme => ({
  description: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2, // Number of lines to show before truncating
    overflow: 'hidden',
  },
  link:{
    fontSize: "20px"
  },
  linkText: {
    color: "#026a63", 
    fontSize: "20px"
  }
}));

const CustomUrlField = ({record, source, style}) => {
  if (!record[source]) return (
    <TextField source="pair:label" className={style.linkText} />
  )

  return(
    <Link href={record[source]} color="primary" target="_blank" underline="hover" className={style.link} >{record["pair:label"]}</Link>
  )
}

const CustomDescription = ({record, descriptionSource, linkSource, linkLabel, style}) => {
  return (
    <div>
      <CustomUrlField record={record} label={linkLabel} source={linkSource} style={style} />
      <TextField source={descriptionSource} className={style.description}/>
    </div>

  )
}

const ResourceList = props => {
  const style = useStyles();
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <Datagrid >
        <CustomDescription label="Ressources" linkSource="pair:homePage" descriptionSource="pair:description" linkLabel="Titre/Lien" descriptionLabel="pair:description" style={style} />
        <ReferenceField label="Source de donnée" source="pair:hasDataSource" reference="Datasource">
            <ChipField source="pair:label" />
        </ReferenceField> 
        <ReferenceArrayField label="Thèmes" reference="Theme" source="pair:hasTopic">
          <ChipList primaryText="pair:label" linkType="show"  externalLinks />
        </ReferenceArrayField>
        {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
