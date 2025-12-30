function Mode({ name, onClick }) {
  return (
    <div className="col-md-6">
      <div className="painel_img" onClick={onClick}>
        {name}
      </div>
    </div>
  );
}

export default Mode;
