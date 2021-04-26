# A React Gallery App
## techdegree-project-7

![image](https://user-images.githubusercontent.com/63255333/116054415-ed752e00-a67b-11eb-9946-455755fc4d1b.png)

## About the project
In this project, I used React to create a gallery app. The app is connected to a flickr account via an API. 
Image requests can be sent to flickr via querystring using the Axois module. The received image data is then displayed in the app.

## Tech Stack
* Node.js
* Express
* React
* Axios

## Example Code

### Search Function (in App.js)
```javascript
  //Performs API request and updates the states
  performSearch = (query) => {
    /*
      It is necessary to set loading back to true everytime. Otherwise it would stay false after the first fetch-request.
      This would lead to the fact, that instead of displaying the loading page, the NotFound page would be displayed.
    */
    this.setState({ loading: true });

    //using axios for the API request
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`
      )
      .then((response) => {
        //updating the state based on the query and setting loading to false, after loading is finished
        if (query === "beach") {
          this.setState({ beach: response.data.photos.photo, loading: false });
        } else if (query === "mountains") {
          this.setState({
            mountains: response.data.photos.photo,
            loading: false,
          });
        } else if (query === "forest") {
          this.setState({ forest: response.data.photos.photo, loading: false });
        } else {
          /*
            Saving every search result in the object "search".
            This is done for the use of the browser's forward and back buttons.
            The search query is saved as a property of the search object.
            The value of that property is an array filled with the response-data.
          */
          let search = this.state.search;
          search[query] = response.data.photos.photo;
          this.setState({
            search: search,
            loading: false,
          });
        }
      })
      .catch((err) => console.log("Error fetching and parsing data", err));
  };
});
```

### SearchForm
   
```javascript
import React, { Component } from "react";

//This import is needed to use "this.props.history.push(path)" to set a path to "/search/${searchValue}"
import { withRouter } from "react-router-dom";

//Creates the Searchfield
class SearchForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    //getting the data from the inputfield ("ref" was used for that)
    let searchValue = this.query.value;
    //calling the callback function "performSearch" with the input value to fetch the data from the API
    this.props.performSearch(searchValue);
    //resets the input field
    e.currentTarget.reset();
    //creates the search path
    let path = `/search/${searchValue}`;
    //calls the search path in the browser
    this.props.history.push(path);
  };

  render() {
    return (
      //on submit the form calls the "handleSubmit" function
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="search"
          //with ref the input field is connecte to "this.query" which can be used to get value out of it
          ref={(input) => (this.query = input)}
          name="search"
          placeholder="Search..."
        />

        <button type="submit" className="search-button" href="/search">
          <svg
            fill="#fff"
            height="24"
            viewBox="0 0 23 23"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </form>
    );
  }
}
export default withRouter(SearchForm);
```
