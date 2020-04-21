import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  ListItem,
  List,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { QuixxPage } from "./quixx/quixx-page";

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <Typography variant="h6" noWrap>
            STIFT UND BLOCK
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export const quixxPath = "/quixx";

export const Home = () => {
  return (
    <div>
      <List>
        <Link to={quixxPath}>
          <ListItem button>QUIXX</ListItem>
        </Link>
      </List>
    </div>
  );
};

export const Layout: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path={quixxPath} children={<QuixxPage />} />
          <Route path="/" children={<Home />} />
        </Switch>
      </Container>
    </Router>
  );
};
