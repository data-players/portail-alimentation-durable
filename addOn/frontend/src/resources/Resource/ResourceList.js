import React from 'react';
import { Datagrid, TextField, ShowButton, ChipField } from 'react-admin';
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import { Link } from '@material-ui/core';

const CustomUrlField = ({record, source}) => {
  if (!record[source]) return (
    <TextField source="pair:label" style={{color: "#026a63"}} />
  )

  return(
    <Link href={record[source]} color="primary" target="_blank" underline="hover" >{record["pair:label"]}</Link>
  )
}

// const CustomChipField = (props, {record, source}) => {
//   console.log(props)
//   return (
//     <ChipField source={record["pair:hasDatasource"]} />
//   )
// }

const ResourceList = props => {
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <Datagrid >
          <CustomUrlField source="pair:homePage" />
          <TextField source="pair:description" />
          <ChipField source="pair:hasDatasource" />
          {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
