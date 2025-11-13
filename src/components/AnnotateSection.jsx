import { useState } from "react";
import UploadDisplay from "./UploadedDisplay";
import { downloadJson } from "../utils";
import visibility from "../assets/visibility.svg";
import disabled_visibile from "../assets/disabled_visible.svg";

const FILE_EXTENSIONS = ["jpg", "png", "jpeg", "webp"];

export default function AnnotateSection() {
  const [imgURL, setImgURL] = useState(null);
  const [annotations, updateAnnotations] = useState({});
  const [saveName, setSaveName] = useState(null);
  const [markersVisible, setMarkerVisibility] = useState(true);

  const handleDragOver = (event) => {
    event.preventDefault(); // the browser will not prepare to open the image
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("drag-over"); // add visual feedback
  };

  const handleImageDrop = (event) => {
    event.preventDefault(); // the browser will not open the image after release
    event.target.classList.remove("drag-over"); // remove visual feedback after release

    const file = event.dataTransfer.files[0];
    const fileName = file.name.split(".")[0];
    const fileExtension = file.name.split(".")[1];
    if (FILE_EXTENSIONS.includes(fileExtension)) {
      setImgURL(URL.createObjectURL(file));
      setSaveName(fileName);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click(); // manually invoke the file picker modal
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSaveName(file.name.split(".")[0]);
    setImgURL(URL.createObjectURL(file));
    updateAnnotations({}); // clear annotations store
  };

  const handleJsonChange = async (event) => {
    const file = event.target.files[0];
    fetch(URL.createObjectURL(file)) // due for refactor. probably a better way to do this
      .then((res) => res.json())
      .then((json) => {
        const data = json ?? {};
        // TODO: add check to confirm it's an Object {}
        // TODO: add error-handling
        if (Object.keys(data).length > 0) {
          updateAnnotations(data);
        }
      });
  };

  const saveToJSON = () => {
    downloadJson(annotations, `${saveName}.json`);
  };

  const loadFromJSON = () => {
    // learn about component refs
    const fileInput = document.getElementById("json-input");
    fileInput.click();
  };

  const numberOfAnnotations = Object.keys(annotations).length;

  return (
    <div>
      <div
        id="drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleImageDrop}
        className={imgURL ? "is-displaying" : ""}
      >
        {imgURL ? (
          <UploadDisplay
            imageURL={imgURL}
            store={annotations}
            updateStore={updateAnnotations}
            markersVisible={markersVisible}
            updateMarkerVisibility={setMarkerVisibility}
          />
        ) : (
          <p>
            Drag and drop an image or click{" "}
            <span className="upload-button" onClick={handleUploadClick}>
              here
            </span>
          </p>
        )}
        <input
          onChange={handleImageChange}
          type="file"
          id="image-input"
          accept=".jpg, .png, .jpeg, .webp"
          multiple={false}
          style={{ display: "none" }}
        ></input>
        <input
          onChange={handleJsonChange}
          type="file"
          id="json-input"
          accept=".json"
          multiple={false}
          style={{ display: "none" }}
        ></input>
      </div>
      <div className="action-buttons">
        <button
          style={{ display: numberOfAnnotations > 0 ? "block" : "none" }}
          title="Toggle markers visibility"
          onClick={() => setMarkerVisibility(!markersVisible)}
        >
          <img src={markersVisible ? disabled_visibile : visibility} />
        </button>
        <button
          style={{ display: imgURL ? "block" : "none" }}
          onClick={handleUploadClick}
        >
          Upload New
        </button>
        <button disabled={imgURL ? false : true} onClick={loadFromJSON}>
          Load JSON
        </button>
        <button
          disabled={numberOfAnnotations > 0 ? false : true}
          onClick={saveToJSON}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
