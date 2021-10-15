const {sendWa}=require("./WA")
const eventEmitter=require("./events")
let contDesconectados=0

function sockets (socket){
    
    let user;

    socket.on('disconnect', () => {
        contDesconectados++
        console.log(contDesconectados);
    });

    socket.on('login', async (userLogin) => {
        //si ya existe user(hicieron emit mas de 1 vez), no se ejecuta nada
        console.log("Usuario logeado");
        if(user)return;


        user = userLogin
        eventEmitter.on(userLogin,(message)=>{
            socket.emit("receive message",message)
        })

        socket.on('send message', async (msg) => {
            console.log("Llego un msj");
            console.log(msg);
            //si el user enviado es diferente al almacenado en el socket
            //no se ejecuta nada
            if(msg.user===user)await sendWa(msg.num,msg.message,user)
        });
    });

}


module.exports=sockets