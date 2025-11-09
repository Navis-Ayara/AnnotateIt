import { useState } from "react";

function UploadDisplay({ imageURL, initiateUpload }) {
  return (
    <img
      onClick={initiateUpload}
      src={imageURL}
      style={{ height: "100%", width: "100%" }}
    />
  );
}

function App() {
  const [imgURL, setImgURL] = useState(null);

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
    setImgURL(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click(); // manually invoke the file picker modal
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgURL(URL.createObjectURL(file));
  };

  return (
    <main>
      <header>
        <h1>AnnotateIt</h1>
      </header>
      <div>
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
                initiateUpload={handleUploadClick}
              />
            ) : (
              <>
                <p>
                  Drag and drop an image or click{" "}
                  <span id="upload-button" onClick={handleUploadClick}>
                    here
                  </span>
                </p>
              </>
            )}
            <input
              onChange={handleImageChange}
              type="file"
              id="file-input"
              style={{ display: "none" }}
            ></input>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
