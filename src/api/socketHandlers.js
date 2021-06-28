import { SocketEvents } from '../constants/socketEvents';
import SocketService from './socket';

export const requestCall = calleeId => SocketService.emit(SocketEvents.REQUESTED_CALL, { calleeId });
export const cancelCall = id => SocketService.emit(SocketEvents.DECLINED_CALL, { id });
export const acceptCall = id => SocketService.emit(SocketEvents.ACCEPTED_CALL, { id });
