import { useState } from "react";
import UploadDisplay from "./UploadedDisplay";
import downloadJson from "../utils";

export default function AnnotateSection() {
  const [imgURL, setImgURL] = useState(null);
  const [isJSONLoaded, setIsJSONLoaded] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [fileName, setFileName] = useState(null);

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
    const extension = file.name.split(".")[1];
    if (["jpg", "png", "jpeg", "webp"].includes(extension)) {
      setImgURL(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click(); // manually invoke the file picker modal
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImgURL(URL.createObjectURL(file));
    const markers = document.querySelectorAll(".marker");
    setAnnotations([]);
    for (const marker of markers) {
      marker.remove();
    }
  };

  const handleJsonChange = async (event) => {
    const file = event.target.files[0];
    fetch(URL.createObjectURL(file))
      .then((res) => res.json())
      .then((data) => setAnnotations(data));
  };

  const saveToJSON = () => {
    downloadJson(annotations, `${fileName}.json`);
  };
  const loadFromJSON = () => {
    const fileInput = document.getElementById("json-input");
    fileInput.click();
  };

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
            points={annotations}
            setPoints={setAnnotations}
          />
        ) : (
          <p>
            Drag and drop an image or click{" "}
            <span id="upload-button" onClick={handleUploadClick}>
              here
            </span>
          </p>
        )}
        <input
          onChange={handleImageChange}
          type="file"
          id="image-input"
          accept=".jpg, .png, .jpeg, .webp"
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
        <button disabled={imgURL ? false : true} onClick={handleUploadClick}>
          Upload New
        </button>
        <button
          disabled={imgURL && !isJSONLoaded ? false : true}
          onClick={loadFromJSON}
        >
          Load JSON
        </button>
        <button
          disabled={annotations.length > 0 ? false : true}
          onClick={saveToJSON}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
