const wa = require('@open-wa/wa-automate');
const dbRedis=require("../db/redis")
const eventEmitter=require("./events")


let clientWA
wa.create().then(client=>{
    clientWA=client

    clientWA.onMessage(async message => {
        eventEmitter.emit("receive message",message)
    });

})


async function sendWa(number,message,user){
    number=number+"@c.us";
    
    clientWA = clientWA || await wa.create()
    let idGroup

    //consula a la db si el grupo esta creado, si no lo esta crea el grupo:
    await dbRedis.getValue(number)
        .then((data)=>{
            idGroup=data            
        })
        .catch(async()=>{//el grupo tendra el nombre de usuario que llega desde el frontend
            let group = await clientWA.createGroup(user,number)
            if (group.gid!=undefined) {
                idGroup=group.gid._serialized
                await dbRedis.insertValue(number,idGroup)
            }
        })

        
    //envia el mensaje:
    setTimeout(async ()=>{
        //await clientWA.setGroupTitle(idGroup, user)
        return await clientWA.sendText(idGroup, message);
        //return await clientWA.sendText(number,user+": "+message);
    },1500)

    return idGroup
}

module.exports={sendWa}