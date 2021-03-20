import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [imagesRendered, updateImagesRendered] = useState([]);

  function handlePopUpButton(image) {
    const popUpButton = document.querySelector("#container");
    popUpButton.style.display = "flex";
    const popUpImage = document.getElementById("popupImage");
    popUpImage.src = image;
  }
  function closePopup() {
    const popUpButton = document.querySelector("#container");
    popUpButton.style.display = "none";
    const popUpImage = document.getElementById("popupImage");
    popUpImage.src = "";
  }
  function renderImages(responseData) {
    const imagesArray = responseData.map((imageObject, index) => {
      const imageUrl = imageObject.download_url;
      return (
        <div key={index} className="image-div col-sm-12 col-md-4 col-lg-3 mt-4">
          <img
            src={imageUrl}
            alt="arrayImage"
            className="photo-image"
            width="350"
            height="250"
            onClick={() => handlePopUpButton(imageUrl)}
          />
          <p className="author-text">Photo By: {imageObject.author}</p>
          <div id="container">
            <div id="box">
              <img id="popupImage" alt="popUpImage" />
              <span id="closeButton" onClick={closePopup}>
                x
              </span>
            </div>
          </div>
        </div>
      );
    });
    updateImagesRendered(imagesArray);
  }
  async function getData() {
    const response = await axios.get("https://picsum.photos/v2/list");
    renderImages(response.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="title text-center">
        <h1>Image Gallery</h1>
      </div>
      <div className="row">{imagesRendered}</div>
    </div>
  );
}

export default App;
