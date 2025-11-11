function downloadJson(data, filename) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const createMarker = (id, localX, localY) => {
  const parentNode = document.getElementById("interaction-container");
  const newElem = document.createElement("div");
  newElem.id = `${id}`;
  newElem.className = "marker";
  newElem.style.left = `${localX}%`;
  newElem.style.top = `${localY}%`;
  newElem.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  parentNode.appendChild(newElem); // add the marker as a child to the hit area
};

export { downloadJson, createMarker };
