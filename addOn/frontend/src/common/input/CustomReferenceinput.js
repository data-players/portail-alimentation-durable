import React, { useEffect, useState  } from 'react';
import { ChipField, useGetList, useRecordContext, useRefresh } from "react-admin";
import {  Button } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { TreeItem, TreeView } from '@mui/lab';
import TreeListCustomContent from '../list/TreeListCustomContent';
import AddIcon from '@mui/icons-material/Add';

function GenerateTreeItem(source, label, allItems, routeTree, parentId) {
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


const CustomReferenceinput = (props) => {
    const { data } = useGetList("Theme", { page: 1, perPage: Infinity });
    const refrech = useRefresh();
    if (!props.record) return null;

    let routeTree = [], allItems = [], nodeIds = [];
    for (const item in data) {
      nodeIds.push(data[item].id);
      if (data[item]["pair:broader"] === undefined ) {
        routeTree.push(data[item]);
      }
      allItems = allItems.concat(data[item]);
    }
    console.log(props.record["pair:broader"]="")

    const handleSelect = (event, nodes) => {
        props.record["pair:broader"] = nodes;
        console.log(props.record)
    };

    return (
        <>
            <TreeView 
                onNodeSelect={handleSelect} 
                aria-label="icon expansion"
                defaultExpanded={nodeIds}
            >
                {GenerateTreeItem("pair:broader", "pair:label", allItems, routeTree)}
            </TreeView >
            
            {/* <AddIcon style={{ backgroundColor:"#026a63", borderRadius: "100%", color: "white", alignSelf: "center", marginLeft:"2%" }} onClick={handleOpen} />
            <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle >Aperçu de l'arborescence des thématiques</DialogTitle>
            <TreeView 
                onNodeSelect={handleSelect} 
                aria-label="icon expansion"
                defaultExpanded={nodeIds}
            >
                {GenerateTreeItem("pair:broader", "pair:label", allItems, routeTree)}
            </TreeView >
            <DialogActions >
                <Button label="ra.action.close" variant="text" onClick={handleClose} />
            </DialogActions>
            </Dialog> */}
        </>
    )
}

export default CustomReferenceinput;