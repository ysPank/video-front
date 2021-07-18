import { io } from "socket.io-client";
import { eventChannel } from 'redux-saga';

import { readUserStorage } from '../helpers/storage';



class SocketService {
  initConnection() {
    const config = {
      path: process.env.REACT_APP_SOCKET_PATH,
      transports: ["websocket"],
    }

    const name = readUserStorage();
    if(name) config.query = { name };

    this.socket = io(process.env.REACT_APP_SOCKET_URL, config)
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
}

const SocketServiceSingleton = new SocketService();
SocketServiceSingleton.initConnection();

export const createUsersChannel = () => {
  const socket = SocketServiceSingleton.socket;

  const subscribe = emitter => {
    const eventHandler = (event, data) => emitter({ event, data });

    socket.onAny(eventHandler);

    return () => socket.offAny(eventHandler);
  };

  return eventChannel(subscribe);
}

export default SocketServiceSingleton;
