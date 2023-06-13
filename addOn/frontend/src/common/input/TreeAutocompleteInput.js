import React, { useState  } from 'react';
import { AutocompleteInput, useGetList, useRecordContext } from "react-admin";
import {  Button } from "@mui/material";
import { Dialog, DialogTitle, DialogActions, makeStyles } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { TreeView } from '@mui/lab';
import GenerateTreeItem from './GenerateTreeItem';

const useStyles = makeStyles(theme => ({
    addIcon: { 
        backgroundColor:"#026a63", 
        borderRadius: "100%", 
        color: "white", 
        alignSelf: "center", 
        marginLeft:"0.5%" 
    },
    test: {
        color: "red"
    }
}));

const TreeAutocompleteInput = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data } = useGetList("Theme", { page: 1, perPage: Infinity });
    const record = useRecordContext();
    const style = useStyles();
    const isFullWidth = props.fullWidth === true;
    if (!record) return null;

    let routeTree = [], allItems = [], nodeIds = [];
    for (const item in data) {
      nodeIds.push(data[item].id);
      if (data[item][props.source] === undefined ) {
        routeTree.push(data[item]);
      }
      allItems = allItems.concat(data[item]);
    }

    const handleSelect = (event, nodes) => {
        if (record.id !== nodes) {
            record[props.source] = nodes;
        }
        handleClose();
    };
    
    return (
        <div style={isFullWidth ? {display: "flex"} : {display: "inline-flex"}}>
            <AutocompleteInput optionText={props.optionText} shouldRenderSuggestions={value => value.length > 1000} {...props} />
            <AddIcon className={style.addIcon} style={!isFullWidth ? {marginLeft: "5%", marginBottom: "7%"} : {marginLeft: "1%", marginBottom: "1%"}} onClick={handleOpen} />
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Aperçu de l'arborescence des thématiques</DialogTitle>
                <TreeView 
                    onNodeSelect={handleSelect} 
                    aria-label="icon expansion"
                    defaultExpanded={nodeIds}
                >
                    {GenerateTreeItem(props.source, props.optionText, allItems, routeTree, false, props.source)}
                </TreeView >
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteInput;