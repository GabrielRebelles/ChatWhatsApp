const {sendWa}=require("./WA")
const eventEmitter=require("./events")

let clients={}

function sockets (socket){
    
    eventEmitter.on("receive message",(message)=>{
        
        //si ya existe el
        if(clients[socket.id]==message.chatId){
            console.log("Receive message");
            socket.emit("receive message",message)
        }
    })

    socket.on('disconnect', () => {
        delete clients[socket.id]
    });

    socket.on('send message', async (msg) => {
        console.log(msg.num,msg.message,msg.user);

        let idGroup=await sendWa(msg.num,msg.message,msg.user)
        clients[socket.id]=clients[socket.id]||[]

        if(clients[socket.id].indexOf(idGroup)==-1){
            clients[socket.id]=clients[socket.id].concat(idGroup)
        }

        console.log("Send: "+clients);

    });
}


module.exports=sockets