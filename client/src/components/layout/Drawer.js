import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import MealContext from "../../context/meal/mealContext";
import Planner from "../pages/Planner";
import Meals from "../pages/Meals";
import GroceryList from "../pages/GroceryList";
import About from "../pages/About";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alerts from "../layout/Alerts";
import PrivateRoute from "../routing/PrivateRoute";
import { Route, Switch, useLocation } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flex: "1 1 100%",
    maxWidth: "100%",
    paddingTop: 80, // equal to AppBar height + 16px
    margin: "0 auto",
    //flexGrow: 1,
    //padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

function ResponsiveDrawer() {
  const drawerAuthCategories = [
    "Planner",
    "Groceries",
    "Meals",
    "Logout",
    "About",
  ];
  const drawerGuestCategories = ["Register", "Login"];

  const authContext = useContext(AuthContext);
  const mealContext = useContext(MealContext);
  const { isAuthenticated, logout } = authContext;
  const { clearMeals } = mealContext;

  const onLogout = () => {
    logout();
    clearMeals();
    setMobileOpen(false); //auto-close the drawer on mobile
  };

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  function handleDrawerClose() {
    setMobileOpen(false); //auto-close the drawer on mobile
  }
  function getPageTitleFromPathName(pathName) {
    const pageName = pathName.replace("/", "");
    if (pageName === "" || pageName === undefined || pageName === null) {
      return "planner";
    } else {
      return pageName;
    }
  }

  const drawerCategories = isAuthenticated
    ? drawerAuthCategories
    : drawerGuestCategories;
  const drawer = (
    <div>
      <List>
        {drawerCategories.map((text, index) =>
          text === "Logout" ? (
            <ListItem button key={text} onClick={onLogout} href="#!">
              <ListItemText primary={text} />
            </ListItem>
          ) : (
            <ListItem
              button
              key={text}
              text={text}
              component={Link}
              to={`/${text.toLowerCase()}`}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar display="flex">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ paddingRight: "0.4em" }}>
            <RestaurantIcon />
          </div>
          <div>
            <Typography variant="h5" noWrap>
              Meal Keeper
            </Typography>
          </div>
          <div style={{ marginLeft: "auto", textTransform: "capitalize" }}>
            <Typography variant="h5" noWrap>
              {getPageTitleFromPathName(useLocation().pathname)}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className="container">
          <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={Planner} />
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/groceries" component={GroceryList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/meals" component={Meals} />
            <PrivateRoute exact path="/planner" component={Planner} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
