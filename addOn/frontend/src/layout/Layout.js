import React, { useMemo } from 'react';
import { Layout as RaLayout, Sidebar } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const useStyles = makeStyles(theme => ({
  appFrame: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      '& #main-content': {
        paddingTop: 8,
        paddingLeft: 5,
      }
    },
  },
  hidden: {
    display: 'none',
  },
}));

const MySidebar = props => {
  const classes = useStyles();
  const isAuthenticate = localStorage.getItem('token') !== null;

  return (
    <div className={isAuthenticate ? '' : classes.hidden}>
      <Sidebar {...props} />
    </div>
  );
};

const Layout = ({ appBar, menu, userMenu, children, labelNbLines, ...otherProps }) => {
  const classes = useStyles();

  const LayoutTreeMenu = useMemo(() => props => <TreeMenu {...props} labelNbLines={labelNbLines} />, [labelNbLines]);
  return (
    <RaLayout
      {...otherProps}
      classes={{ appFrame: classes.appFrame } }
      sidebar={MySidebar}
      appBar={appBar}
      menu={menu ? menu : LayoutTreeMenu} 
    >
      {children}
    </RaLayout>
  );
};

Layout.defaultProps = {
  appBar: AppBar
};

export default Layout;
