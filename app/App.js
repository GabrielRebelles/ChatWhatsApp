import React from "react"
import Login from "./components/login"
import ListOfChats from "./components/listOfChats"
import Chat from "./components/chat"
import CreateChat from "./components/createChat"

//import io from "socket.io-client"

let foto = `https://media-exp1.licdn.com/dms/image/C4D03AQGHkNYFXyup7g/profile-displayphoto-shrink_100_100/0/1594620480562?e=1613001600&v=beta&t=9Pa5Z1WWvlRTJYXpg7X_nvnATtJ544q6ubXarGkKNDg`


class App extends React.Component{
	constructor(){
		super()
        this.state={
			openChat:0,
			name:"",
			listChats:[],
			// socket:io("http://localhost:3500")
        }
        //this.handleChange=this.handleChange.bind(this)
	}


	componentDidMount(){
		socket.on("receive message",(message)=>{
            let {author,body,sender} = message
            //let p = document.createElement("p")
			//p.innerHTML=message.sender.pushname+": "+message.body;
			console.log(message);

			author=parseInt(author)

			this.state.listChats.forEach((element,index)=>{
				console.log(element.phone);
				console.log(author);
				if (element.phone==author) {
					element.nameContact=sender.pushname
					this.state.listChats[index].messages.push({name:author,message:body})
					this.forceUpdate()
				}
			})


        })
	}


	
	render() {
        console.log(this.state.openChat);


		return (
		<div className="" >
			{
				this.state.name?
				<div className="row" >
					<div className="card" >
						<div className="col m10 offset-m1">
							<div className="col s12 m4">
								<button
								className="light-blue darken-4 btn-large waves-effect"
								style={{ width: "100%"}}
								onClick={()=>{
									this.setState({modalAddChat:true})
								}}
								>Agregar chat</button>
								<ListOfChats stateApp={this}></ListOfChats>
							</div>
							<div className="col s12 m8">
								<Chat stateApp={this}></Chat>
							</div>
						</div>
					</div>
				</div>
				:
				<Login stateApp={this}></Login>
			}
			<CreateChat stateApp={this}></CreateChat>
		</div>
		)
	}
}

export default App;
