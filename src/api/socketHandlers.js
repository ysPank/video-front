import { SocketEvents } from '../constants/socketEvents';
import SocketService from './socket';

export const requestCall = calleeId => SocketService.emit(SocketEvents.REQUESTED_CALL, { calleeId });
export const cancelCall = id => SocketService.emit(SocketEvents.DECLINED_CALL, { id });
export const acceptCall = id => SocketService.emit(SocketEvents.ACCEPTED_CALL, { id });

export const sendIceCandidate = payload => SocketService.emit(SocketEvents.ICE_CANDIDATE, payload);
export const sendRTCOffer = payload => SocketService.emit(SocketEvents.OFFER, payload);
export const sendRTCAnswer = payload => SocketService.emit(SocketEvents.ANSWER, payload);

export const updateMe = payload => SocketService.emit(SocketEvents.USER_UPDATED, payload);
