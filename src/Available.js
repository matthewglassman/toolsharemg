import React, { Component } from 'react';
import axios from 'axios';
import Unavailable from "./Unavailable";

import { 
	Modal,
	Button,
	ButtonToolbar,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap/lib/';


class Available extends Component {

	constructor(props) {
		super(props);

		this.state= {
			availableTools: [],
			unavailableTools: [],
			update: false,
			showModal: false,
			currentTool: {
				toolCondition: '',
				toolMaxDays: '',
				toolName: '',
				toolPrice: ''
			}
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.getAvailable = this.getAvailable.bind(this);
		this.getUnavailable = this.getUnavailable.bind(this);
		this.borrowTool = this.borrowTool.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.open = this.open.bind(this);
    	this.close = this.close.bind(this);
	}	

	componentDidMount () {
		this.getAvailable();
		this.getUnavailable();
	}

	getAvailable () {
		var available = [];

		axios.get("/getTools", {}).then((response)=>{
			for(var i=0; i<response.data.length; i++){
				if(response.data[i].toolStatus){
					available.push(response.data[i]);
				}
			}

			console.log("getAvailable result: " +JSON.stringify(available));
			this.setState({ availableTools: available });
			console.log("this.state.availableTools: ")
			console.log(this.state.availableTools);
		});
	
	}

	getUnavailable () {
		var unavailable = [];

		axios.get("/getTools", {}).then((response)=>{
			//console.log(response);
			for(var i=0; i<response.data.length; i++){
				if(!response.data[i].toolStatus){
					unavailable.push(response.data[i]);
				}
			}
			console.log("getUnavailable result: " +JSON.stringify(unavailable));
			this.setState({ unavailableTools: unavailable });
			console.log(this.state.unavailableTools);
		});	
	}

	componentDidUpdate (prevState, prevProps) {

		if(this.state.update){
			this.getAvailable();
			this.getUnavailable();
			this.setState({ update: false });
		}

	}

	handleClick (i) {

		var tools = this.state.availableTools;

		var toolToBorrow = tools[i];

		this.borrowTool(toolToBorrow);
		this.setState({ update: true });
	}

	borrowTool (tool) {

		axios.post("/borrowTool", {id: tool._id})
			.then(function(response){
				console.log(response);
			}).catch(function(err){
				console.log(err);
			})

	}

	open(event) {

		var value = event.target.value;
		var currentToolObj = this.state.availableTools[value];
		this.setState({toolCondition: currentToolObj.toolCondition});
		this.setState({toolMaxDays: currentToolObj.toolMaxDays});
		this.setState({toolName: currentToolObj.toolName});
		this.setState({toolPrice: currentToolObj.toolPrice});

        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

 
	render(){
		return(
			<section>
				<div className="available container col-md-12">
					<h2>Available Tools for Rent</h2>
					<div className="thumbnails">
						{this.state.availableTools.map(function(search, i){
							return (
									<div className="col-md-4">
										<div className="thumbnail">
											<img src={search.toolUrl} className="img-responsive" />
											<div className="caption">
												<h3>{search.toolName}</h3>
												<p>Owner: {search.toolOwnerName}</p>
												{/*<p>Condition: {search.toolCondition}</p>*/}
												<ButtonToolbar>
													<Button
														bsStyle="primary"
														value={i}
														onClick= {() => this.handleClick(i)}
													>
														Borrow
													</Button>	
													<Button
														value={i}
														onClick={this.open}
													>
														More Info
													</Button>
												</ButtonToolbar>
											</div>		
										</div>
										<Modal show={this.state.showModal} onHide={this.close} bsSize="small" aria-labelledby="contained-modal-title-sm">
											<Modal.Header>
												<h2 className="black">{this.state.toolName}</h2>
											</Modal.Header>
											<Modal.Body>
												<ListGroup className="left">
													<ListGroupItem>Condition <br/>
														&emsp; {this.state.toolCondition}</ListGroupItem>
												    <ListGroupItem>Damage/Lost Price <br/>
												    	&emsp; ${this.state.toolPrice}</ListGroupItem>
												    <ListGroupItem>Max # of Days To Rent <br/>
												    	&emsp; {this.state.toolMaxDays}</ListGroupItem>
												 </ListGroup>
				                            </Modal.Body>
										</Modal>
									</div>
								)
						}, this)}
					</div>
				</div>
				<Unavailable unavailableTools={this.state.unavailableTools} />
			</section>	
		);
	}
}

export default Available;