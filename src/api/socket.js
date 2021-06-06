import { io } from "socket.io-client";
import { eventChannel } from 'redux-saga';
import { SocketEvents } from "../constants/socketEvents";

class SocketService {
  initConnection() {
    this.socket = io(process.env.REACT_APP_SOCKET_URL, {
      path: process.env.REACT_APP_SOCKET_PATH,
      transports:	["websocket"],
    })

    this.socket.on('connection', (d) => {
      console.log('))IW)U)U', d)
    });
    this.socket.on(SocketEvents.USER_LEFT, (d) => {
      console.log('left', d)
    });
  }
}

const SocketServiceSingleton = new SocketService();
SocketServiceSingleton.initConnection();

export const createUsersChannel = () => {
  const socket = SocketServiceSingleton.socket;

  const subscribe = emitter => {
    socket.on(SocketEvents.USER_JOINED, emitter);

    return () => socket.removeListener(SocketEvents.USER_JOINED, emitter);
  };

  return eventChannel(subscribe);
}

export default SocketServiceSingleton;
