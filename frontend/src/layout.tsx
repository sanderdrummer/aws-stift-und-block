import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {
  AppBar,
  ListItem,
  List,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { QuixxPage } from "./quixx/quixx-page";

export const Header: React.FC = () => {
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Button onClick={() => history.push("/")}>
          <Typography color="textPrimary" variant="h6" noWrap>
            STIFT UND BLOCK
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export const quixxPath = "/quixx";

export const Home = () => {
  const history = useHistory();
  return (
    <div>
      <List>
        <ListItem onClick={() => history.push(quixxPath)} button>
          QUIXX
        </ListItem>
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
