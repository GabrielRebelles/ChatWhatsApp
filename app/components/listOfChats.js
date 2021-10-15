import React from "react"
import { formatPhoneNumberIntl } from 'react-phone-number-input'



class ListOfChats extends React.Component{
    constructor(){
		super()
        this.state={
            
        }
    }

    changeChat(index){        
        this.props.stateApp.setState({openChat:index})
    }
    

    render(){
        let list = this.props.stateApp.state.listChats

        return(
            <React.Fragment>
                <div className="card" style={{height:"78vh",maxHeight:"78vh",overflowY: "scroll",borderColor:"violet",border: "2px solid #311b92"}}>
                    {
                        list.map((element,index)=>{
                            let lastMessage=element.messages?element.messages[element.messages.length-1].message:"ningun msj";
                            let lastMessageParsed=lastMessage.split('').filter((item,index)=>{return index<12 }).join('')
                            if(lastMessage.length>12)lastMessageParsed+="..."
                            return (
                                <div onClick={()=>{this.changeChat(index)}} className="row" style={{backgroundColor:"teal",width:"100%",marginLeft:"0px",marginBottom:"2px"}} >
                                    <div className="col">
                                        <img 
                                        src={element.picture} 
                                        srcSet="ImagenPerfil.png"
                                        width="50vw" 
                                        style={{borderRadius:"50vw",marginTop:"1vh"}} 
                                        alt="IMG"/>
                                    </div>
                                    <div className="col">
                                        <h6>{element.nameContact||formatPhoneNumberIntl("+"+element.phone)}</h6>
                                        <span>{lastMessageParsed}</span>
                                    </div>
                                </div>
                                )
                        })
                    }
                </div>

            </React.Fragment>
        )
    }
}

export default ListOfChats