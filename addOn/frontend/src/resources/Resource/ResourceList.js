import React from 'react';
import { Datagrid, TextField, ShowButton, useRedirect } from 'react-admin';
// import SimpleList from "../../common/list/SimpleList";
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import Button from '@mui/material/Button';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const CustomLinkShowButton = ({record}) => {
  const redirect = useRedirect()
  if (!record ) return null;
  const isNotLinked = !record["pair:homePage"];

  const handleClick = () => {
    if (isNotLinked) {
        const value = encodeURIComponent(record.id);
        redirect('/Resource/'+value+"/show");
    } else {
      window.location.replace(record["pair:homePage"]);
    }
  }

  return(
    <div >
      <Button style={{color: "#026a63", fontSize: "0.8125rem"}} variant="text" startIcon={<OpenInBrowserIcon />} onClick={handleClick} >
        LIEN
      </Button>
    </div>
  )
}

const ResourceList = props => {
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <Datagrid >
          <TextField source="pair:label" />
          <TextField source="pair:description" />
          <CustomLinkShowButton />
          {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
