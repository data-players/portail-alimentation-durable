import React from "react";
import { TreeItem } from '@mui/lab';
import TreeListCustomContent from '../list/TreeListCustomContent';

function CustomTreeItem(props) {
    return <TreeItem ContentComponent={TreeListCustomContent} {...props} />;
}

const generateTreeItem = (parentProperty, optionText, allItems, routeTree, parentId, dejavueItem) => {
    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : allItems.filter(({ [parentProperty]: itemParentProperty }) => itemParentProperty === parentId);
    return (
        listToUse.map((route) => {
            
            const test = dejavueItem.filter(item => item === route.id)
            if (test.length < 1) {
                dejavueItem.push(route.id)

                return (
                    <CustomTreeItem 
                        nodeId={route["id"]} 
                        label={route[optionText]} 
                        key={route["id"]} style={route["selected"] ? {color: "#026a63" } : null }
                    >
                        {generateTreeItem(parentProperty, optionText, allItems, [], route["id"], [...dejavueItem])}
                    </CustomTreeItem>
                )
            }
        })
    )
}

const buildTreeData = (data, source, defaultExpanded) => {
    let routeTree = [], allItems = [], expendedNodes = [], validIds = [];
    for (const item in data) {
        if (defaultExpanded) {
            expendedNodes.push(data[item].id);
        }
        if (data[item][source] === undefined ) {
            routeTree.push(data[item]);
        }
        allItems = allItems.concat(data[item]);
    }
    return {routeTree, allItems, expendedNodes};
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

export { generateTreeItem, buildTreeData, buildTreeListData } 
