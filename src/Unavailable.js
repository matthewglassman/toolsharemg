import React, { Component } from 'react';
//import "./Unavailable.css";
import axios from 'axios';

class Unavailable extends Component {

	constructor(props) {
		super(props);

		this.state= {
			unavailableTools: this.props.unavailableTools
		};

		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.unavailableTools !== this.state.unavailableTools){
			this.setState({ unavailableTools: nextProps.unavailableTools });
		}
	}

	
	render(){
		return(
			<div className="unavailable container col-md-12">
				<h2>Rented Tools</h2>
					<div className="thumbnails">
						{this.state.unavailableTools.map(function(search, i){
							return (
								<div className="col-md-4">
									<div className="thumbnail">
										<img src={search.toolUrl} className="img-responsive" />
										<div className="caption">
											<h3>{search.toolName}</h3>
											<p>Owner: {search.toolOwner}</p>
											<p>Condition: {search.toolCondition}</p>
										</div>		
									</div>
								</div>
								)
						}, this)}
					</div>				
			</div>
			);
	}
}

export default Unavailable;