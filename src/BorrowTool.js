import React, { Component } from 'react';
// import "./BorrowTool.css";
import Available from "./Available";


class BorrowTool extends Component {
	render(){
		return(
			<div className="BorrowTool container">
				<h1 className="white">Borrow Tools</h1>
				<Available />
			</div>
			);
	}
}

export default BorrowTool;