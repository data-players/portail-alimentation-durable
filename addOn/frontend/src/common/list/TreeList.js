import React from 'react';
import { useRedirect } from "react-admin";
import { TreeView } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { buildTreeData, buildTreeListData, generateTreeItem } from '../input/TreeItemUtils';


const TreeList =({data, source, label, defaultExpanded = true}) => {
  const redirect = useRedirect()

  const handleSelect = (event, nodes) => {
    const value = encodeURIComponent(nodes);
    redirect('/Theme/'+value+"/");
  }

  const treeListData = buildTreeData(data, source, defaultExpanded)
  
  return (
    <TreeView
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
      defaultExpanded={treeListData.expendedNodes}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.routeTree, false, [])}
    </TreeView>
  )
}

export default TreeList;