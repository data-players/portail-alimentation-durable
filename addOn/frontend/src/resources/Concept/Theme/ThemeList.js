import React from 'react';
// import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";
import TreeList from '../../../common/list/TreeList';

const ThemeList = props => (
  <List {...props}>
    <TreeList />
  </List>
);

export default ThemeList;
