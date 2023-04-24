import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";
import ResourceFilterSideBar from "./ResourceFilterSideBar";

const ResourceList = props => (
  <List {...props} aside={<ResourceFilterSideBar />} >
    <SimpleList  primaryText={record => record['pair:label']} leftAvatar={() => <LocalOfferIcon />} linkType="show" />
  </List>
);

export default ResourceList;
