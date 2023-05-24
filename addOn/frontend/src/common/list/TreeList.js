import React from 'react';
import { useRedirect } from "react-admin";
import {TreeItem, TreeView} from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import TreeListCustomContent from './TreeListCustomContent';

function GenerateTreeItem( listTheme, routeTree, parentId,) {
// If !parentId it's a trunkItem
  const isParentLevel = !parentId;
  const listToUse = isParentLevel ? routeTree : listTheme.filter(({ ["pair:broader"]: themeSource }) => themeSource === parentId);
  return (
      listToUse.map((route) =>
          <CustomTreeItem nodeId={route["id"]} label={route["pair:label"]} key={route["id"]}>
              {GenerateTreeItem(listTheme, routeTree, route["id"])}
          </CustomTreeItem>
      )
  )
}
    
function CustomTreeItem(props) {
  return <TreeItem ContentComponent={TreeListCustomContent} {...props} />;
}

const TreeList =({data}) => {
  const redirect = useRedirect()
  const handleSelect = (event, nodes) => {
    const value = encodeURIComponent(nodes);
    redirect('/Theme/'+value+"/show");
  }

  let routeTree = [], listTheme = [];
  for (const theme in data) {
    if (data[theme]['pair:broader'] === undefined ) {
      routeTree.push(data[theme]);
    }
    listTheme = listTheme.concat(data[theme]);
  }
  return (
    <TreeView
      multiSelect
      onNodeSelect={handleSelect}
      aria-label="icon expansion"
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
    >
        {GenerateTreeItem(listTheme, routeTree)}
    </TreeView>
  )
}

export default TreeList;