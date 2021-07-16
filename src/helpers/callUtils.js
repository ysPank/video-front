import SocketService from '../api/socket';
import { sendIceCandidate, sendRTCOffer } from '../api/socketHandlers'
import { logRTC } from './Logger';

/**
 * Handle ICE candidate in case if any available candidates left
 * to try and establish connection
 * @param {any} event.candidate Candidate object
 * @param {string} opponentId Socket id of opponent
 */
export function handleICECandidateEvent({ candidate } = {}, opponentId) {
  if (candidate) {
    sendIceCandidate({
      target: opponentId,
      candidate: candidate,
    })
  }
}

/**
 * Handle Ice candidate event incoming from socket
 * @param {any} event Socket event payload
 * @param {any} peerConnection Peer connection stored in ref
 */
export function handleNewICECandidateMsg(event, peerConnection) {
  try {
    const candidate = new RTCIceCandidate(event);

    peerConnection
      .addIceCandidate(candidate)
      .catch(logRTC);
  } catch {
    logRTC('candidate error');
  }

}

/**
 * Start handshacke procedure by creating an offer
 * @param {string} opponentSocketId
 * @param {any} peerConnection Peer connection stored in ref
 */
export function handleNegotiationNeededEvent(opponentSocketId, peerConnection) {
  peerConnection
    .createOffer()
    .then(offer => peerConnection.setLocalDescription(offer))
    .then(() => sendRTCOffer({
      target: opponentSocketId,
      caller: SocketService.socket.id,
      sdp: peerConnection.localDescription
    }))
    .catch(logRTC);
}

/**
 * Handle answer socket event
 * @param {object} event
 * @param {object} event.sdp Session descriptor sent by socket
 * @param {any} peerConnection Peer connection stored in ref
 * @returns {void}
 */
export function handleAnswer(event, peerConnection) {
  peerConnection
    .setRemoteDescription(new RTCSessionDescription(event.sdp))
    .catch(logRTC);
}
