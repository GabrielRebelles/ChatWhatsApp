const wa = require('@open-wa/wa-automate');
const dbGroup=require("../db/groups")
const eventEmitter=require("./events")

/*
La img de perfil se guarda en:
sender.profilePicThumbObj.eurl
*/


let clientWA
wa.create().then(client=>{
    clientWA=client

    clientWA.onMessage(async message => {
        //cuando llegue un mensaje, tiene que buscar el id del grupo en la db
        //en la db tiene que estar asociado el grupo con el user
        //tiene que emitir el evento con el nombre del user

        //console.log(message.from);

        await dbGroup.findOne({idGroup:message.from})
            .then(async (msg)=>{
                if(!msg) return;

                //agrega el mensaje al array de mensajes
                // msg.messages.push({name:message.sender.pushname,message:message.body})
                // await dbGroup.findByIdAndUpdate(msg._id,{messages:msg.messages},{useFindAndModify:false})

                eventEmitter.emit(msg.user,message)
            })

    });

})


async function sendWa(number,message,user){
    //number=number+"@c.us";
    
    clientWA = clientWA || await wa.create()
    let idGroup

    //consula a la db si el grupo esta creado, si no lo esta crea el grupo:
    
    //voy a tener que crear un grupo por cada usuario nuevo
    //en vez de por cada numero al que se le envia msj
    
    await dbGroup.findOne({phone:number,user})
        .then(async(data)=>{
            //console.log(data);
            if(data !== null){
                idGroup=data.idGroup
                //envia el mensaje:
                await clientWA.sendText(idGroup, message);
                data.messages.push({name:user,message})
                await dbGroup.findByIdAndUpdate(data._id,{messages:data.messages},{useFindAndModify:false})
   
            }else{            
                //crea el grupo y envia el mensaje
                let group = await clientWA.createGroup(user,number+"@c.us")
                if (group.gid!=undefined) {
                    idGroup=group.gid._serialized
                    await dbGroup.create({user,phone:number,idGroup,messages:{name:user,message}})
                    //await dbRedis.insertValue(number,idGroup)
                }
                setTimeout(async ()=>{
                    return await clientWA.sendText(idGroup, message);
                },2500)
            }
        })


    return idGroup
}

module.exports={sendWa}