import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { useTreeItem} from '@mui/lab';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: 15,
        paddingBottom: 15,
        paddingTop: 15,
        cursor:"pointer",
    },
}));

const TreeListCustomContent = React.forwardRef(function CustomContent(props, ref) {
    const test = useStyles();
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;
  
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);
  
    const icon = iconProp || expansionIcon || displayIcon;
  
    const handleMouseDown = (event) => {
      preventSelection(event);
    };
  
    const handleExpansionClick = (event) => {
      handleExpansion(event);
    };
  
    const handleSelectionClick = (event) => {
      handleSelection(event);
    };
  
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={test.listItem}
        >
          {label}
        </Typography>
      </div>
    );
  });

  export default TreeListCustomContent;