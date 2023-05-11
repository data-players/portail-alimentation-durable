import React from 'react';
import { makeStyles } from '@material-ui/core';
import LabelIcon from '@mui/icons-material/Label';


const useStyles = makeStyles(theme => ({
    listItem: {

        padding: 15,
        paddingBottom: 15,
        paddingTop: 15,
        marginBottom: 10,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
        borderWidth: 2,
        cursor:"pointer",
        marginLeft: "20px"
    },
    icon:{
        minWidth: "56px",
        color: "#bdbdbd",
        verticalAlign:"middle"
    }
}));

function GenerateTreeItem( listTheme, routeTree, classes, parentId,) {
// If !parentId it's a trunkItem
    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : listTheme.filter(({ ["pair:broader"]: themeSource }) => themeSource === parentId);
    return (
        listToUse.map((route) =>
        <>
            <div onClick={() => window.location.replace(route["id"])} className={classes.listItem} >
                <LabelIcon className={classes.icon} fontSize='medium'/>
                {route["pair:label"]}
            </div>
            <div style={{paddingLeft: "4%"}}>
                {GenerateTreeItem( listTheme, [], classes, route["id"])}
            </div>
        </>
        
        
        )
    )
}

const TreeList =({data}) => {
    const classes = useStyles();
    let routeTree = [], listTheme = [];
    for (const theme in data) {
      if (data[theme]['pair:broader'] === undefined ) {
        routeTree.push(data[theme]);
      }
      listTheme = listTheme.concat(data[theme]);
    }
    return (
        <div>
            {GenerateTreeItem(listTheme, routeTree, classes)}
        </div>
    )
}

export default TreeList;