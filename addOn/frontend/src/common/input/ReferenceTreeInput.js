import React, { useState, useEffect } from 'react';
import { useRecordContext, AutocompleteArrayInput, useGetList } from "react-admin";
import { Grid, Typography, Box, Button, Modal } from "@mui/material";
import { Dialog, DialogTitle, DialogActions, makeStyles } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { TreeItem, TreeView } from '@mui/lab';
import TreeListCustomContent from '../list/TreeListCustomContent';

function GenerateTreeItem(source, label, allItems, routeTree, parentId) {
    const record = useRecordContext();
    if (!record) return null;

 
    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : allItems.filter(({ [source]: itemSource }) => itemSource === parentId);
    // if (record["pair:topicOf"]) {
    //     record["pair:topicOf"].map((recordedTopic) => {
    //         listToUse.map((theme) => theme["id"] === recordedTopic ? theme["selected"] = true : theme["selected"] = false)
    //     })
    // }
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

const ReferenceTreeInput = (props) => {
    const record = useRecordContext();
    const [showDialog, setShowDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data } = useGetList("Theme", { page: 1, perPage: Infinity });

    let routeTree = [], allItems = [], nodeIds = [];
    for (const item in data) {
      nodeIds.push(data[item].id);
      if (data[item]["pair:broader"] === undefined ) {
        routeTree.push(data[item]);
      }
      allItems = allItems.concat(data[item]);
    }
    console.log(props.input.value)

    const handleSelect = (event, nodes) => {
        if (!props.input.value.includes(nodes) && props.input.value !== ""){
            props.input.value.push(nodes)
        }
        handleClose();
    };

    return (
        <div style={{display: "flex"}}>
            <Grid container spacing={2}>
                <Grid item sm={7}>
                    <AutocompleteArrayInput optionText="pair:label" {...props} shouldRenderSuggestions={value => value.length > 1} fullWidth />
                </Grid>
                <Grid item sm={5} style={{alignSelf: "center"}}>
                    <AddIcon style={{ backgroundColor:"#026a63", borderRadius: "100%", color: "white" }} onClick={handleOpen} />
                    <Typography source="coucou" />
                </Grid>
            </Grid>

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
            </Dialog>
        </div>
    )
}

export default ReferenceTreeInput;