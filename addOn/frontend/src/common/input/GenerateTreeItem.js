import React from "react";
import { useRecordContext } from "react-admin";
import { TreeItem } from '@mui/lab';
import TreeListCustomContent from '../list/TreeListCustomContent';

const GenerateTreeItem = (source, label, allItems, routeTree, parentId ) => {
    const record = useRecordContext();
    if (!record) return null;

    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : allItems.filter(({ [source]: itemSource }) => itemSource === parentId);
    
    return (
        listToUse.map((route) =>
        <CustomTreeItem 
            nodeId={route["id"]} 
            label={route[label]} 
            key={route["id"]} style={route["selected"] ? {color: "#026a63" } : null }
        >
            {GenerateTreeItem(source, label, allItems, [], route["id"])}
        </CustomTreeItem>
        )
    )
}

function CustomTreeItem(props) {
    return <TreeItem ContentComponent={TreeListCustomContent} {...props} />;
}

export default GenerateTreeItem;