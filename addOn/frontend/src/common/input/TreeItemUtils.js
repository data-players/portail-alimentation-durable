import React from "react";
import { TreeItem } from '@mui/lab';
import TreeListCustomContent from '../list/TreeListCustomContent';

function CustomTreeItem(props) {
    return <TreeItem ContentComponent={TreeListCustomContent} {...props} />;
}

const generateTreeItem = (source, label, allItems, routeTree, parentId) => {

    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : allItems.filter(({ [source]: itemSource }) => itemSource === parentId);
    
    return (
        listToUse.map((route) =>
        <CustomTreeItem 
            nodeId={route["id"]} 
            label={route[label]} 
            key={route["id"]} style={route["selected"] ? {color: "#026a63" } : null }
        >
            {generateTreeItem(source, label, allItems, [], route["id"])}
        </CustomTreeItem>
        )
    )
}

const buildTreeData = (data, source, defaultExpanded, record) => {
    let routeTree = [], allItems = [], expendedNodes = [], validIds = [];
    for (const item in data) {
        if (defaultExpanded) {
            expendedNodes.push(data[item].id);
        }
        if (data[item][source] === undefined ) {
            routeTree.push(data[item]);
        }
        if (item !== record.id) {
            validIds.push(item);
        }
        allItems = allItems.concat(data[item]);
    }
    return {routeTree, allItems, expendedNodes, validIds};
}

export { generateTreeItem, buildTreeData } 
