import React from "react"


class Chat extends React.Component{
    constructor(){
		super()
        this.state={

        }
        this.sendMessage=this.sendMessage.bind(this)
	}


    sendMessage(event){
        let message = document.getElementById("inputMessage").value
        
        //aca voy a enviar el msj con el socket
        //y en otro punto voy a hacer el algoritmo para que se muestre en pantalla
        if (message) {
            let {openChat, name}=this.props.stateApp.state
            this.props.stateApp.state.listChats[openChat].messages=this.props.stateApp.state.listChats[openChat].messages||[]
            this.props.stateApp.state.listChats[openChat].messages.push({name,message})

            let user = this.props.stateApp.state.name
            let num = this.props.stateApp.state.listChats[openChat].phone
            socket.emit('send message',{num,message,user})

            //console.log(this.props.stateApp.state.listChats[openChat]);
            //console.log({num,message,user});

            this.props.stateApp.forceUpdate()
            document.getElementById("inputMessage").value=""
        }
        

        //implementar que se envien los msj por socket

        event.preventDefault()
    }


    componentDidMount(){
        //aca va a pedir los datos tipo nombre y foto        
        let scrollMessages=document.getElementById("scrollMessages")
        scrollMessages.scroll(0,scrollMessages.scrollHeight)
    }

    componentDidUpdate(){
        let scrollMessages=document.getElementById("scrollMessages")
        scrollMessages.scroll(0,scrollMessages.scrollHeight)
    }
    

    render(){
        
        let chat = this.props.stateApp.state.listChats[this.props.stateApp.state.openChat]
        let myName = this.props.stateApp.state.name
        return(
            <React.Fragment>
                <div className="" style={{height:"88vh"}}>

                    {/* Foto con nombre */}
                    <div className="row" style={{borderBottom: "2px solid #311b92"}} >
                        
                        <div className="col">
                            <img 
                            style={{borderRadius:"50vw"}}
                            srcSet={(chat&&chat.picture)||"ImagenPerfil.png"}
                            width="50vw" 
                            alt="Imagen de perfil"/>
                        </div>
                        <div className="col">
                            <p style={{fontSize:"2.5ch",marginTop:"1vh"}} >{chat&&(chat.nameContact||chat.phone)}</p>
                        </div>
                        
                    </div>

                    {/* Lista de mensajes */}
                    <div className="col" id="scrollMessages" style={{maxHeight:"75vh",height:"75vh",width:"102%",overflowY: "scroll",paddingBottom:"5vh"}}>
                        {
                            !chat||!chat.messages||
                            chat.messages.map((element,index) => {
                                let align=myName===element.name?"right":"left";
                                let color=myName===element.name?" teal darken-3":" grey darken-1";
                                return (
                                    <React.Fragment>
                                        <div className={"col s12 "+align}>
                                            <br/>
                                            <span style={{borderRadius:"4px",padding:"5px", margin:"-10px",maxWidth: "75vh",wordWrap:"break-word"}}
                                            className={align+color} key={index}>{element.message}</span>
                                        </div>
                                        
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>

                    {/* Input para escribir mensajes */}
                    <div className="row">
                            <div className="form-field">
                                <form onSubmit={this.sendMessage}>
                                    <input 
                                        type="text" 
                                        style={{width: "79%", height:"4ch", border:"1px solid #78909c" }} 
                                        id="inputMessage"
                                        autoComplete="off"
                                    />
                                    <button
                                        className="light-blue darken-4 btn right waves-effect"
                                        style={{ width: "20%" }}
                                        type="submit"
                                    >Enviar</button>
                                </form>
                            </div>
                    </div>
                </div>


            </React.Fragment>
        )
    }


}

export default Chat