import React from "react";

//If a URL is used which doesn't match an existing route

const FileNotFound = () => {
  return (
    <li className="not-found">
      <h3>Error 404 - File not Found</h3>
      <p>The URL does not match an existing route.</p>
      <p>Try to use the Searchbar and the default topic buttons.</p>
      <p>That should work.</p>
    </li>
  );
};

export default FileNotFound;
