import React, { useState } from "react";
import PlayerLabel from "./PlayerLabel";
import "../css/PlayerCarousel.css";

const players = [
  { id: "mainPlayer", name: "Nina" },
  { id: "mainPlayerTeff", name: "Teff" },
  { id: "mainPlayerSnow", name: "Snow" },
  { id: "mainPlayerDark", name: "Dark" },
];

export default function PlayerCarousel({ setMainPlayer, mainPlayer }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="player-carousel">
      {players.map((player) => {
        const isSelected = mainPlayer === player.id;
        return (
          <div
            key={player.id}
            className={`carousel-item ${isSelected ? "selected" : ""} player-card`}
            onClick={() => setMainPlayer(player.id)}
            onMouseEnter={() => setHovered(player.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <PlayerLabel
              id={player.id}
              name={player.id}
              highlight={isSelected || hovered === player.id}
            />
            <span className="player-name">{player.name}</span>
          </div>
        );
      })}
    </div>
  );
}
