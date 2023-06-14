import React from "react";
import {TreeItem} from '@mui/lab';
import TreeListCustomContent from './TreeListCustomContent';

function CustomTreeItem(props) {
return <TreeItem ContentComponent={TreeListCustomContent} {...props} />;
}

const buildTreeListData = (data) => {
    let routeTree = [], allItems = [];
    for (const theme in data) {
      if (data[theme]['pair:broader'] === undefined ) {
        routeTree.push(data[theme]);
      }
      allItems = allItems.concat(data[theme]);
    }
  
    return {routeTree, allItems};
}
        
export {  buildTreeListData } 

    