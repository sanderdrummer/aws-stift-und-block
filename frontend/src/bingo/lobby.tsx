import React from "react";
import { useSelector } from "react-redux";
import {
  usePlayer,
  useLobby,
  usePlayerName,
  usePlayers,
  getPlayers,
} from "./store";
import { Bingo } from "./bingo";
import {
  Box,
  Card,
  CardHeader,
  Button,
  CardContent,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";

export const Lobby = () => {
  const { isInLobby, joinLobby } = useLobby();
  const playerName = usePlayerName();

  if (playerName) {
    return (
      <>
        <Bingo />
        <Players />
      </>
    );
  }

  if (isInLobby) {
    return (
      <Box mt={6}>
        <Card>
          <CardContent>
            <PlayerForm />
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box mt={6}>
      <Card>
        <CardHeader
          title="Der Lobby beitreten"
          action={<Button onClick={joinLobby}>Beitreten</Button>}
        />
      </Card>
    </Box>
  );
};

const Players = () => {
  const players = usePlayers();
  return (
    <List>
      {players.map((player) => (
        <ListItem key={player.id}>{player.name}</ListItem>
      ))}
    </List>
  );
};

export const PlayerForm = () => {
  const { setPlayer } = usePlayer();
  const [name, setName] = React.useState("");
  return (
    <Box>
      <TextField
        fullWidth
        label="spieler name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={() => setPlayer(name)}>mit spielen</Button>
    </Box>
  );
};
