const {sendWa}=require("./WA")
const eventEmitter=require("./events")


function sockets (socket){
    
    let user;

    socket.on('disconnect', () => {
        console.log("usuario desconectado");
    });

    socket.on('login', async (userLogin) => {
        //si ya existe user(hicieron emit mas de 1 vez), no se ejecuta nada
        if(user)return;

        user = userLogin
        eventEmitter.on(user,(message)=>{
            socket.emit("receive message",message)
        })

    });

    socket.on('send message', async (msg) => {
        //si el user enviado es diferente al almacenado en el socket
        //no se ejecuta nada
        if(msg.user!==user)return;
        
        await sendWa(msg.num,msg.message,user)
    });
}


module.exports=sockets