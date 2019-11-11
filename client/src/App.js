import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import Contacts from "./containers/Contacts/Contacts";
import Crm from "./containers/Crm/Crm";
import AOS from "aos";
import "aos/dist/aos.css";

import AUTH_TOKEN from "./utils/constants";
import CURRENT_USER from "./grqphql/queries";

class App extends Component {
  state = {
    currUser: null
  };

  componentDidMount() {
    AOS.init({
      duration: 2000
    });

    const authToken = localStorage.getItem("auth-token");
    // TODO init state
    // https://itnext.io/managing-local-state-with-apollo-client-and-react-hooks-9ad357e6d649
  }

  render() {
    // const { data } = client.query({
    //   query: gql`
    //     {
    //       showLogin @client
    //     }
    //   `
    // });

    // console.log("showLogin query: ", data);

    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/crm" component={Crm} />
          <Route path="/home/:username" component={Home} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/contacts/:username" component={Contacts} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
