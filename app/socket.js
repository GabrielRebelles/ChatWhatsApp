//module.exports=io("http://localhost:3500");

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3500");

module.exports = socket;
    



// export default function () {
// 	const socket = io.connect("http://localhost:3500");
// 	return socket;
// }
