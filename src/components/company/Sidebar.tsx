import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ListIcon from '@mui/icons-material/List';
import logo from '../../assets/images/logo.jpg'


import { Navbar } from './Navbar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { logOut } from '../../redux/action/userActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const menuItems = [
    { text: 'dashboard', icon: <DashboardIcon /> },
    { text: 'messages', icon: <MailIcon /> },
    { text: 'All Applicants', icon: <ApartmentIcon /> },
    { text: 'jobs', icon: <ListIcon /> },
    { text: 'schedule', icon: <ScheduleIcon /> },
    { text: 'company profile', icon: <PersonIcon /> },
    //   { text: 'jobs', icon: <WorkIcon /> },
]

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar() {
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };
    const dispatch: AppDispatch = useDispatch()

    const handleLogoutConfirm = async () => {
        setLogoutDialogOpen(false);
        await dispatch(logOut()).unwrap()
        // console.log(data, 'data logout successfull')
            navigate('/')
       
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };



    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
                    
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', boxShadow: 1 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), color: 'black' }}
        >
            <MenuIcon />
        </IconButton>
        <Navbar />
    </Toolbar>
</AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <div >

          <img className='p-3 w-40' src={logo} alt="" />
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map(({ text, icon }) => (
                        <Link to={text} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding className='capitalize'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} className='text-maincolr ' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                </List>
                <Divider />
                {/* <List>
          {['settings','logout'].map((text, index) => (
        <Link to={text} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem key={text} disablePadding  className='capitalize' >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} className='text-maincolr ' />
              </ListItemButton>
            </ListItem>
          </Link>
          ))}
        </List> */}
                <List>
                    <Link to="settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding className='capitalize'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="settings" className='text-maincolr ' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <ListItem disablePadding className='capitalize' onClick={handleLogoutClick}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="logout" className='text-maincolr ' />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Dialog
                    open={logoutDialogOpen}
                    onClose={handleLogoutCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm Logout"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLogoutCancel}>Cancel</Button>
                        <Button onClick={handleLogoutConfirm} autoFocus>
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>

    );
}