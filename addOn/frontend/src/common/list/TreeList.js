import React from 'react';
import { useRedirect } from "react-admin";
import { TreeView } from '@material-ui/lab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { buildTreeData, generateTreeItem } from '../input/TreeItemUtils';


const TreeList =({data, source, label, defaultExpanded = true}) => {
  const redirect = useRedirect()

  const handleSelect = (event, nodes) => {
    const value = encodeURIComponent(nodes);
    redirect('/Theme/'+encodeURIComponent(nodes.id));
  }

  const treeListData = buildTreeData(data, source, defaultExpanded)
  
  return (
    <TreeView
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
      defaultExpanded={treeListData.expendedNodes}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.routeTree, false, [], handleSelect)}
    </TreeView>
  )
}

export default TreeList;