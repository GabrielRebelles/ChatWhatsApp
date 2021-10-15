import React from "react";

//const socket = require('../socket')


//import io from "socket.io-client"
//const socket = require('socket.io-client')('http://localhost:3500/')

class Login extends React.Component {

    constructor(){
		super()
        this.state={

        }

        this.loginFunc=this.loginFunc.bind(this)
	}

	loginFunc(){
        // let {socket} = this.props.stateApp.state
        //console.log(socket);
        
        let name=document.getElementById("name").value
        socket.emit('login',name)
        this.props.stateApp.setState({name})
	}



	render() {
        console.log("change state login");
		return (
			<React.Fragment>
				<div className="row">
					<div className="col s12 m4 offset-m4">
						<div className="card">
							<div className="card-action light-blue darken-4 white-text">
								<h4>Ingrese su nombre</h4>
							</div>
							<div className="card-content">
                                <form>
                                    <div className="form-field">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" id="name"/>
                                    </div>
                                    <div className="form-field">
                                        <button
                                            className="light-blue darken-4 btn-large waves-effect"
                                            style={{ width: "100%" }}
                                            onClick={this.loginFunc}
                                            >Iniciar</button>
                                    </div>
                                </form>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


export default Login