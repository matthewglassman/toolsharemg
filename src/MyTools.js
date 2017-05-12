import React, { Component } from 'react';
import axios from 'axios';
import "./AddTool";
import "./MyTools.css";

//import Login from "./Login";
// // import User from "../models/User.js";

// class MyTools extends Component {
// componentDidMount(){
// 	return axios.get("/mytools")
// 	.then(function(response){
// 		console.log(response);
// 		// console.log(User);
// 		// for (var i=0; i < response.data.length; i++){
// 		// 	if (response.data[i].email === )
// 		// }
// 	})
// }
	
import $ from "jquery";

class MyTools extends Component {
	constructor (props) {
		super(props);

		this.state = {
//			thisUsersTools : ''
			thisUsersTools : []
		}
	}

	componentDidMount() {

		console.log("componentDidMount MyTools");
		// var toolsArray = [];
		// var tempArticle = $("<Article />");
		// console.log("created tempArticle");

		axios.get("/getMyTools", {
			// userName : "e201"
    }).then( (response) => {
    	// line 28 was breaking the page for me, had to comment it out to get it to work
		// console.log("tool name = " + response.data[0].toolName);
    	this.setState({thisUsersTools: response.data})
    	console.log(response);
    	console.log("response.data.length = " + response.data.length);
    	

    	// for(var i=0; i<response.data.length; i++){
    	// 	$("<h4>" + response.data[i].toolName +"</h4>" ).appendTo(tempArticle);
    	// }
    	// tempArticle.appendTo("#userToolDiv");
    })
	}

 // componentDidMount(){
 // 	return axios.get("/mytools")
 //  		.then(function(response){
 //  			console.log(response);
 //  		// var firstName = response.data[0].firstName;
 //  		// 	console.log(firstName);
 // 	});

 // }



	render(){
		return(
			// <div className="MyTools">
			// 		<h2>MyTools Page</h2>


			<div className="UsersTools container">


						<div className="UserAddress">
							{this.props.useraddress}
						</div>
						<div id="userToolDiv" className="UsersTools">
							<h2>Your tools</h2>
							{this.state.thisUsersTools.map(function(tool) {
								return(
								<div key={tool._id} className="toolEntry">
									<h4>{tool.toolName}</h4>
									<img src={tool.toolUrl} alt="" />
								</div>
									)
								
							})}
						</div>
			</div>
		);
	}
}


export default MyTools;
