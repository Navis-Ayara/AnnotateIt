function App() {
  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("drag-over");
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];
    console.log(file);
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
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
          >
            <p>
              Drag and drop an image or click{" "}
              <span id="upload-button" onClick={handleUploadClick}>
                here
              </span>
            </p>
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
