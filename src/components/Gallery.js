import React from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

/*Creates the input of the Website*/
const Gallery = ({ data }) => {
  let gallery;
  //If the array is not empty it creates an array of images by using the Photo-Component
  if (data.length > 0) {
    gallery = data.map((photo) => (
      <Photo
        farm={photo.farm}
        server={photo.server}
        id={photo.id}
        secret={photo.secret}
        title={photo.title}
        key={photo.id}
      />
    ));
  } else {
    //If the array is null, there was no data found. Then the "NotFound" page should appear.
    gallery = <NotFound />;
  }

  //Rendering the gallery array into HTML
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{gallery}</ul>
    </div>
  );
};

export default Gallery;
