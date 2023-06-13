import React, { useState  } from 'react';
import { AutocompleteArrayInput, useGetList } from "react-admin";
import {  Button } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { TreeView } from '@mui/lab';
import GenerateTreeItem from './GenerateTreeItem';

const TreeAutocompleteArrayInput = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data } = useGetList("Theme", { page: 1, perPage: Infinity });
    const isFullWidth = props.fullWidth === true;

    let routeTree = [], allItems = [], nodeIds = [];
    for (const item in data) {
      nodeIds.push(data[item].id);
      if (data[item][props.source] === undefined ) {
        routeTree.push(data[item]);
      }
      allItems = allItems.concat(data[item]);
    }

    const handleSelect = (event, nodes) => {
        if (props.input.value === undefined ) {
            props.input.onChange([nodes]);
        } else if (!props.input.value.includes(nodes)){
            const newVal = [...(props.input.value), nodes]
            props.input.onChange(newVal)
        }
        handleClose();
    };

    return (
        <div style={isFullWidth ? {display: "flex"} : {display: "inline-flex"}} >
            <AutocompleteArrayInput optionText={props.optionText} shouldRenderSuggestions={value => value.length > 1000} {...props} />
            <AddIcon style={{ backgroundColor:"#026a63", borderRadius: "100%", color: "white", alignSelf: "center", marginLeft:"2%" }} onClick={handleOpen} />
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Aperçu de l'arborescence des thématiques</DialogTitle>
                <TreeView 
                    onNodeSelect={handleSelect} 
                    aria-label="icon expansion"
                    defaultExpanded={nodeIds}
                >
                    {GenerateTreeItem(props.source, props.optionText, allItems, routeTree)}
                </TreeView >
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteArrayInput;
