import React, { Component } from 'react';
import axios from "axios";

// import {
// 	BrowserRouter as Router,
// 	Route,
// 	NavLink,
// 	Switch
// } from 'react-router-dom';

class EnsureLoggedInContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      firstName: '',
      lastName: '',
      // toolsOwned: [],
      groupID: '',
      isLoggedIn: false
    };
  }

  componentDidMount() {
    // const { dispatch, currentURL } = this.props
    axios.get("/checkLogin").then(res => {
      console.log("inside axios");
      console.log(res.data);
      this.setState({
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        // toolsOwned: *have to do a push into array thing here i think,
        groupID: res.data.groupID,
        isLoggedIn: true
      });
    })

    if (!this.state.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(currentURL))
      // browserHistory.replace("/login")
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
// function mapStateToProps(state, ownProps) {
//   return {
//     isLoggedIn: state.loggedIn,
//     currentURL: ownProps.location.pathname
//   }
// }

export default EnsureLoggedInContainer;