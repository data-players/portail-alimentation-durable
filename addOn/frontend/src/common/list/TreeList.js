import React from 'react';
import { useRedirect } from "react-admin";
import { TreeView } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { buildTreeListData, generateTreeList } from './TreeListUtils';
import { generateTreeItem } from '../input/TreeItemUtils';


const TreeList =({data, source, label}) => {
  const redirect = useRedirect()

  const handleSelect = (event, nodes) => {
    const value = encodeURIComponent(nodes);
    redirect('/Theme/'+value+"/");
  }

  const treeListData = buildTreeListData(data)

  return (
    <TreeView
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.routeTree, false, [])}
    </TreeView>
  )
}

export default TreeList;