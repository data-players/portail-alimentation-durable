import React from 'react';
import { Datagrid, TextField, ReferenceArrayField, SingleFieldList, ChipField, ShowButton, useRedirect } from 'react-admin';
// import SimpleList from "../../common/list/SimpleList";
import List from "../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";
import Button from '@mui/material/Button';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const Test = ({record}) => {
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
        LINK
      </Button>
    </div>
  )
}

const ResourceList = props => {
  const isAuthicate = localStorage.getItem('token') !== null

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      {/* <SimpleList  primaryText={record => record['pair:label']} leftAvatar={() => <LocalOfferIcon />} linkType="show" /> */}
      <Datagrid  >
          <TextField source="pair:label" />
          <TextField source="pair:description" />
          <ReferenceArrayField label="Thème" reference="Theme" source="pair:hasTopic" >
            <SingleFieldList>
              <ChipField source="pair:label" />
            </SingleFieldList>
          </ReferenceArrayField>
          <Test />
          {isAuthicate ? <ShowButton /> : null}
      </Datagrid>
    </List>
  )
};

export default ResourceList;
