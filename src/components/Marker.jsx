import { useState } from "react";

function Marker({
  id,
  localX,
  localY,
  annotations,
  updateAnnotations,
  name,
  activeID,
  setActiveID,
}) {
  const [label, setLabel] = useState(name ?? "");

  const updateLabel = (e) => {
    setLabel(e.target.value);
    const updatedPoints = { ...annotations };
    updatedPoints[id].name = e.target.value;
    updateAnnotations(updatedPoints);
  };

  return (
    <div
      id={id}
      style={{
        left: `${localX}%`,
        top: `${localY}%`,
        position: "absolute",
        zIndex: 3,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        className="marker"
        onClick={() => {
          setActiveID(id);
        }}
      ></div>
      {activeID === id && (
        <div className="label">
          <input
            type="text"
            value={label}
            onChange={updateLabel}
            className="label-input"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

export default Marker;
