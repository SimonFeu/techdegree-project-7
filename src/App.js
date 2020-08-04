//Imports: React, React-Router and axios for fetching the data
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

//Importing Components
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import Gallery from "./components/Gallery";
import NotFound from "./components/NotFound";
import FileNotFound from "./components/FileNotFound";
import apiKey from "./config.js";

//Creating App Component
class App extends Component {
  //Implementing the Arrays for the default topics and the search results.
  //Also declaring a variable to show if axois is loading the data

  state = {
    search: [],
    beach: [],
    mountains: [],
    forest: [],
    loading: true,
  };

  //When all components are loaded data is fetched for the array for the default topics
  componentDidMount() {
    this.performSearch("beach");
    this.performSearch("mountains");
    this.performSearch("forest");
  }

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
          this.setState({ search: response.data.photos.photo, loading: false });
        }
      })
      .catch((err) => console.log("Error fetching and parsing data", err));
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm performSearch={this.performSearch} />
          <Nav />
          <Switch>
            {/*Home rout opens Gallery. By default the data for "beach" is used*/}
            <Route
              exact
              path="/"
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.beach} />
                )
              }
            />
            {/*Beach rout opens Gallery with the data for "beach"*/}
            <Route
              path="/beach"
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.beach} />
                )
              }
            />
            {/*Mountains rout opens Gallery with the data for "mountains"*/}
            <Route
              path="/mountains"
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.mountains} />
                )
              }
            />
            {/*Forest rout opens Gallery with the data for "forest"*/}
            <Route
              path="/forest"
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.forest} />
                )
              }
            />
            {/*If the search button is clicked with a value this path is called. Uses the search  data*/}
            <Route
              path="/search/:topic"
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.search} />
                )
              }
            />
            {/*If the search button is clicked without a value the "NotFound" site appears*/}
            <Route exact path="/search" component={NotFound} />
            {/*If non of the above paths matches the "FileNotFound" site appears*/}
            <Route component={FileNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
