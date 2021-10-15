import React from "react";

import 'react-phone-number-input/style.css'
import PhoneInput,{isValidPhoneNumber} from 'react-phone-number-input'


class CreateChat extends React.Component {

    constructor(){
		super()
        this.state={
            valuePhone:""
        }
        
        this.addChat=this.addChat.bind(this)
    }
    
    addChat(event){
        console.log(this.state.valuePhone);
        let phone=this.state.valuePhone

        //Verifica que sea un numero valido
        if(isValidPhoneNumber(phone)){
            //Elimina el "+" y añade un 9 despues del codigo de pais si es 54(ARG)
            phone = phone.split('').filter((char)=>{return !isNaN(char) && char!=" "})
            phone[2]=phone[0]=="5"&&phone[1]=="4"&&phone[2]!=="9" ? "9"+phone[2]:phone[2];
            phone=phone.join('')
            this.props.stateApp.state.listChats.push({phone})
            this.props.stateApp.setState({modalAddChat:false})
        }else{
            let span1=document.getElementById("span1")
            span1.classList.add("darken-4","red-text")
            span1.innerHTML="Numero incorrecto"
        }

        event.preventDefault();
    }



    render(){
        //Utilizo el estado de la App 
        let stateApp = this.props.stateApp

        let valor;

        return(
            <React.Fragment>
                {
                    stateApp.state.modalAddChat||(stateApp.state.name&&!stateApp.state.listChats.length)?
                        <React.Fragment>
                            <div className="modal" tabIndex="0" style={{zIndex: 1003, display: "block", opacity: 1, top: "10%", transform: "scaleX(1) scaleY(1)"}}>
                                <div className="container">
                                    <form style={{margin:"-1vw"}} onSubmit={this.addChat} id="formulario">
                                        
                                        {/* Input */}
                                        <div style={{margin:"1vw",marginTop:"4vh"}}>
                                            <span style={{fontSize:"13px", color:"#455a64"}}>Numero de Whatsapp</span><br/>
                                            <PhoneInput
                                            international
                                            defaultCountry="AR"
                                            onChange={(value)=>{this.state.valuePhone=value}}/>
                                            <span id="span1"></span>
                                        </div>

                                        {/* Botones */}
                                        <div> 
                                            <button 
                                                className="btn left indigo lighten-2 right" 
                                                style={{margin:"1ch",marginBottom:"4vh"}} 
                                                type="submit"
                                            >Agregar</button>
                                            <button 
                                                className="btn left indigo lighten-2 right" 
                                                onClick={()=>{stateApp.setState({modalAddChat:false})}} 
                                                style={{margin:"1ch",marginBottom:"4vh"}} 
                                            >Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Fondo oscuro del modal */}
                            <div className="modal-overlay" onClick={()=>{stateApp.setState({modalAddChat:false})}} style={{zIndex: 1002, display: "block", opacity: 0.5}}></div>
                        </React.Fragment>
                    :""
                }
            </React.Fragment>
        )
        
    }
}

export default CreateChat