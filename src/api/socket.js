import { io } from "socket.io-client";
import { eventChannel } from 'redux-saga';

import { readUserStorage } from '../helpers/storage';

class SocketService {
  initConnection() {
    this.socket = io(process.env.REACT_APP_SOCKET_URL, {
      path: process.env.REACT_APP_SOCKET_PATH,
      transports: ["websocket"],
      query: { name: readUserStorage() || undefined }
    })
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
