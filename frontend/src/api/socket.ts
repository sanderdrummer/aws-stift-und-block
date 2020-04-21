import React from "react";

export const useSocket = (url: string, playerName: string) => {
  const [player, setPlayer] = React.useState(undefined);
  const [players, setPlayers] = React.useState([]);
  const [dice, setDice] = React.useState({});
  const socketRef = React.useRef(new WebSocket(url));
  React.useEffect(() => {
    socketRef.current.onopen = (event) => {
      console.log("on open", event);
      socketRef.current.send(
        JSON.stringify({ type: "login", payload: { playerName } })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.diceState) {
        setDice(data.diceState);
      }
      if (data.players) {
        setPlayers(data.players);
        const player = data.players.find(
          (item: { name: string }) => item.name === playerName
        );
        setPlayer(player);
      }
      console.log(data);
    };
  }, []);

  const rollDice = () => {
    if (player) {
      socketRef.current.send(JSON.stringify({ type: "roll", player }));
    }
  };

  React.useEffect(() => {
    console.log(socketRef.current.readyState);
  }, [socketRef.current.readyState]);

  return {
    rollDice,
    players,
    dice,
    player,
    socket: socketRef.current,
  };
};
