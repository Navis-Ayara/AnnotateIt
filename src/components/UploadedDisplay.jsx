export default function UploadDisplay({ imageURL, points, setPoints }) {
  let x, y, boundingBox, mouseEvent;

  const createMarker = (id, event, localX, localY) => {
    const newElem = document.createElement("div");
    newElem.id = `${id}`;
    newElem.className = "marker";
    newElem.style.left = `${localX}%`;
    newElem.style.top = `${localY}%`;
    newElem.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    event.target.parentNode.appendChild(newElem); // add the marker as a child to the hit area
  };

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
          mouseEvent = event;
        }}
        onMouseUp={() => {
          // limit to 8 points
          if (points.length <= 7) {
            let newPoints = [...points];
            const id = points.length + 1 + 100;
            newPoints.push({
              id: id,
              data: { x: x, y: y, name: "" },
            });
            setPoints(newPoints);
            createMarker(id, mouseEvent, x, y);
            console.log(newPoints); // debug. to be removed
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: "2",
        }}
      ></div>
    </div>
  );
}

// TODO: implement annotations loaded from JSON
