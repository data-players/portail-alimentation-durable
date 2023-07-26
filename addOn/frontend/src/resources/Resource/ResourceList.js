import React from 'react';
import { Datagrid, ShowButton, ChipField, TextField } from 'react-admin';
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import { Link, makeStyles } from '@material-ui/core';
import { ReferenceArrayField, ReferenceField } from '@semapps/field-components';
import ChipList from '../../common/list/ChipList';
import { css } from '@emotion/react';

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

const CustomUrlField = ({record, source, cssStyle}) => {
  if (!record[source]) return (
    <TextField source="pair:label" className={cssStyle.linkText} />
  )

  return(
    <Link href={record[source]} color="primary" target="_blank" underline="hover" className={cssStyle.link} >{record["pair:label"]}</Link>
  )
}

const CustomDescription = ({record, descriptionSource, linkSource, linkLabel, cssStyle}) => {
  return (
    <div>
      <CustomUrlField record={record} label={linkLabel} source={linkSource} cssStyle={cssStyle} />
      <TextField source={descriptionSource} className={cssStyle.description}/>
    </div>

  )
}

const ResourceList = props => {
  const style = useStyles();
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <Datagrid  style={{tableLayout: 'auto'}} >
        <CustomDescription 
          label="Ressources" 
          linkSource="pair:homePage" 
          descriptionSource="pair:description" 
          linkLabel="Titre/Lien" 
          descriptionLabel="pair:description" 
          cssStyle={style} 
        />
        <ReferenceField label="Source de donnée" source="pair:hasDataSource" reference="Datasource" linkType={false} >
            <ChipField source="pair:label" style={{color: "#026a63"}}/>
        </ReferenceField> 
        <ReferenceArrayField label="Thèmes" reference="Theme" source="pair:hasTopic" >
          <ChipList primaryText="pair:label" linkType={false} />
        </ReferenceArrayField>
        {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
