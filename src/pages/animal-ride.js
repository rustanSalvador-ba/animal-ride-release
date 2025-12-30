import { useState, useEffect } from "react";
import io from "socket.io-client";
import NavBar from "../../Components/NavBar";
import PlayerLabel from "../../Components/PlayerLabel";
import PlayerCarousel from "../../Components/PlayerCarousel";
import Mode from "../../Components/Mode";
import Sala from "../../Components/Sala";
import InputRoom from "../../Components/InputRoom";
import Footer from "../../Components/Footer";
import data from "../../salas.json";
import "../../css/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AnimalRide() {
  const [isClient, setIsClient] = useState(false);
  const [salas, setSalas] = useState(data.salas || []);
  const [mainPlayer, setMainPlayer] = useState("");
  const [mode, setMode] = useState("");
  const [newRoomShow, setNewRoomShow] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerSelectSound, setPlayerSelectSound] = useState(null);
  const [modeSelectSound, setModeSelectSound] = useState(null);

  // Somente no client
  useEffect(() => {
    setIsClient(true);
    setPlayerSelectSound(new Audio("/sounds/player.wav"));
    setModeSelectSound(new Audio("/sounds/mode.wav"));

    const s = io("https://animal-ride-release.onrender.com", {
      transports: ["websocket"],
      withCredentials: true,
    });

    s.on("connect", () => console.log("Conectado ao servidor de jogo"));
    s.on("sala", (sala) => setSalas((prev) => [...prev, sala]));

    setSocket(s);

    return () => s.disconnect();
  }, []);

  function handlePlayerClick(player) {
    setMainPlayer(player);
    if (playerSelectSound) playerSelectSound.play();
  }

  function handleModeClick(selectedMode) {
    setMode(selectedMode);
    if (modeSelectSound) modeSelectSound.play();
  }

  function toggleNewRoom() {
    setNewRoomShow((prev) => !prev);
  }

  function sendNewSala(nome) {
    if (!socket) return;
    const sala = { name: nome };
    setSalas((prev) => [...prev, sala]);
    socket.emit("newSala", JSON.stringify(sala));
  }

  function addNewRoom() {
    const nome = document.getElementById("room-name").value;
    if (!nome) return;
    const exists = salas.some((s) => s.name === nome);
    if (!exists) sendNewSala(nome);
  }

  function getPlayerDisplayName(playerId) {
    switch (playerId) {
      case "mainPlayer":
        return "Nina";
      case "mainPlayerTeff":
        return "Teff";
      case "mainPlayerSnow":
        return "Snow";
      case "mainPlayerDark":
        return "Dark";
      default:
        return "";
    }
  }

  if (!isClient) return null;

  return (
    <div>
      <NavBar />

      <div id="salas">
        <h2 style={{ color: "rgb(12, 240, 12)" }}>Enter to play...</h2>

        <div id="newRoom" style={{ display: newRoomShow ? "block" : "none" }}>
          <InputRoom onClick={addNewRoom} />
        </div>

        <div className="col-xs-12">
          {salas.filter(e => e.name != null)
              .map((el, index) => {
                  return (<div key={index}>
                            <Sala name={el.name} href={el.name} player={mainPlayer} mode={mode} selected={true}></Sala>
                          </div>)
              })}
        </div>

        <span
          onClick={toggleNewRoom}
          className={newRoomShow ? "glyphicon glyphicon-minus online" : "glyphicon glyphicon-plus online"}
        ></span>
      </div>

      <div id="players">
        <div className="col-md-8">
          <div
            className="col-md-4 text-center"
            style={{ marginRight: "10px", color: "rgb(12, 240, 12)" }}
          >
            <h4>Mode: {mode}</h4>
          </div>

          <div
            className="col-md-4 text-center"
            style={{ marginRight: "10px", color: "rgb(12, 240, 12)" }}
          >
            <h4>
              Player: {getPlayerDisplayName(mainPlayer)}
              <PlayerLabel
                id={mainPlayer}
                name={mainPlayer}
                onClick={() => handlePlayerClick(mainPlayer)}
              />
            </h4>
          </div>
        </div>

        <Mode name="Versus" onClick={() => handleModeClick("versus")} />
        <Mode name="Single" onClick={() => handleModeClick("single")} />

        <PlayerCarousel setMainPlayer={handlePlayerClick} />
      </div>

      <Footer />
    </div>
  );
}
