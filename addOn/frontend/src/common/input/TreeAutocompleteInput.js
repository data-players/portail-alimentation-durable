import React, { useState  } from 'react';
import { AutocompleteInput, useGetList, useRecordContext, choices, getResources } from "react-admin";
import {  Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';import { TreeView } from '@mui/lab';
import {generateTreeItem, buildTreeData} from './TreeItemUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles(theme => ({
    editIcon: { 
        backgroundColor:"#026a63", 
        borderRadius: "100%", 
        color: "white", 
    },
}));

const TreeAutocompleteInput = (props) => {
    const style = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //TO DO : expliquer pk on a treeReference => car reference devient choices
    const { data } = useGetList(props.treeReference, { page: 1, perPage: Infinity });

    const resources = useSelector(getResources);
    const treeRessource = resources.find(r => r.name === props.treeReference);

    const record = useRecordContext();
    const isFullWidth = props.fullWidth === true;

    const handleSelect = (event, nodes) => {
        props.input.onChange(nodes)
        handleClose();
    };

    if (!record) return null;
    const treeData = buildTreeData(data, props.source, props.defaultExpanded, record);
    
    return (
        <div style={{display: "flex", alignItems: "top"}}>
            <div style={{flexGrow: isFullWidth ? 1 : 0}}>
                <AutocompleteInput validate={choices(treeData.validIds, `La selection ne peut pas être l'élément courant`)} {...props} />
            </div>
            <div style={{paddingTop: "20px", paddingLeft: "10px"}}>
             <EditIcon className={style.editIcon} onClick={handleOpen} />
            </div>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Choix du {treeRessource.options.label} </DialogTitle>
                <TreeView 
                    onNodeSelect={handleSelect} 
                    defaultExpanded={treeData.expendedNodes}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {generateTreeItem(props.parentProperty, props.optionText, treeData.allItems, treeData.routeTree, false, props.source)}
                </TreeView >
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteInput;