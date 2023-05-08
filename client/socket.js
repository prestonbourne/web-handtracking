import { io } from "socket.io-client";


const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

const socket = io(SERVER_BASE_URL, {
 reconnectionAttempts: 3
});







export default socket