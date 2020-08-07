import React from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

/*Creates the input of the Website*/
const Gallery = ({ data }) => {
  /* 
  The array is stored in an Object. It is called by using the parameter which is passed through the URL.
  This can lead to a typeof "undefined" on loading the page. So it is checked if the array "data" has
  not a typeof "undefined" and is not empty. If this is true it creates an array of images by using the Photo-Component.
  Else it uses the NotFound-Component to show the user that there is no data.
  */

  let gallery;
  if (typeof data !== "undefined" && data.length > 0) {
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
