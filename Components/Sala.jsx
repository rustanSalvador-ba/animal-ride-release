export default function Sala( props ) {
  return (
    <div
      className={`room-card ${props.selected ? "selected" : ""}`}
      onClick={props.onClick}
    >
      <h4>ROOM {props.name}</h4>
      <span className="room-status online">ONLINE</span>
      <a href={"animal-ride/rooms/"+props.href+"?player="+props.player+"&mode="+props.mode}>{props.name}<span className="glyphicon glyphicon-globe online"></span></a>
    </div>
  );
}
