import { useState } from "react";

import Marker from "./Marker";

export default function UploadDisplay({
  imageURL,
  store,
  updateStore,
  markersVisible,
}) {
  let x, y, boundingBox;

  const [activeID, setActiveID] = useState(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <img
        src={imageURL}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: "1",
          objectFit: "fill",
        }}
      />
      <div
        id="hit-area"
        onMouseDown={(event) => {
          if (activeID) {
            // removes current label visibility
            setActiveID(null);
          } else if (markersVisible === true) {
            // calculates positions relative to the hit-area container
            // x  => (top-left x Position Relative To Viewport - top-left x Container Position Relative To Viewport)
            // y  => (top-left y Position Relative To Viewport - top-left y Container Position Relative To Viewport)
            //
            // then calculates percantage for responsive positions
            // (x or y coordinates / hit area dimensions (width or height) * 100)

            boundingBox = event.target.getBoundingClientRect();
            x = event.clientX - boundingBox.left;
            x = ((x / boundingBox.width) * 100).toFixed(4);
            y = event.clientY - boundingBox.top;
            y = ((y / boundingBox.height) * 100).toFixed(4);
          }
        }}
        onMouseUp={() => {
          // limit to 8 points
          const numberOfAnnotations = Object.keys(store).length;

          if (numberOfAnnotations < 8 && boundingBox) {
            // && boundingBox adds a criteria that checks if a point is in memory
            let updatedAnnotations = { ...store };
            const id = numberOfAnnotations + 1 + 100;
            updatedAnnotations[id.toString()] = { x: x, y: y, name: "" };
            updateStore(updatedAnnotations);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: "2",
        }}
      ></div>
      {markersVisible &&
        Object.keys(store).map((annotationID) => (
          <Marker
            key={annotationID}
            id={annotationID}
            localX={store[annotationID]?.x}
            localY={store[annotationID]?.y}
            annotations={store}
            updateAnnotations={updateStore}
            name={store[annotationID]?.name}
            activeID={activeID}
            setActiveID={setActiveID}
          />
        ))}
    </div>
  );
}
