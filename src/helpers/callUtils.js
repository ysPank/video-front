import SocketService from '../api/socket';
import { sendIceCandidate, sendRTCOffer } from '../api/socketHandlers'
import { Resolutions } from '../constants/resolutionOptions';
import { logRTC } from './Logger';

/**
 * Handle ICE candidate in case if any available candidates left
 * to try and establish connection
 * @param {any} event.candidate Candidate object
 * @param {string} opponentId Socket id of opponent
 * @returns {void}
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
 * @param {{current: RTCPeerConnection}} peerConnection Ref to Peer connection
 */
export function handleNewICECandidateMsg(event, peerConnection) {
  try {
    const candidate = new RTCIceCandidate(event);

    peerConnection.current
      .addIceCandidate(candidate)
      .catch(logRTC);
  } catch {
    logRTC('candidate error');
  }

}

/**
 * Start handshacke procedure by creating an offer
 * @param {string} opponentSocketId
 * @param {RTCPeerConnection} peerConnection Peer connection stored in ref
 * @returns {void}
 */
export const handleNegotiationNeededEvent = (opponentSocketId, peerConnection) => {
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
 * @param {{current: RTCPeerConnection}} peerConnection Ref to Peer connection
 * @returns {void}
 */
export const handleAnswer = (event, peerConnection) => {
  peerConnection.current
    .setRemoteDescription(new RTCSessionDescription(event.sdp))
    .catch(logRTC);
}


export const getVideoOptions = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if(connection?.saveData || connection?.effectiveType?.includes('2g')) return Resolutions.minecraft;
  if(connection?.effectiveType === '3g') return Resolutions.normal;

  return Resolutions.unlimited;
}
