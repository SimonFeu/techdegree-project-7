import React from "react";

//If no result is found this is the page to show

const NotFound = () => {
  return (
    <li className="not-found">
      <h3>No Results Found</h3>
      <p>Your search did not return any results. Please try again.</p>
    </li>
  );
};

export default NotFound;
