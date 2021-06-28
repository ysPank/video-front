import React, { useEffect, useRef } from 'react';

import 'antd/lib/modal/style/css';
import { connect, useSelector } from 'react-redux';
import { CallStatuses } from '../constants/callStatuses';
import { setModal } from '../redux/calls/actions';

const config = {};

const OngoingCall = ({
  setModal,
}) => {
  const call = useSelector(state => state.calls);
  const user = useSelector(state => state.users.me);

  const peerConnection = useRef();
  const localStream = useRef();
  const remoteStream = useRef();

  const localVideo = useRef();
  const remoteVideo = useRef();

  const streamConstraints = {
    audio: true,
    video: true
  };

  const isInitiator = user.id === call?.callerId;

  const handleAddStream = (newStream, isLocal = true) => {
    const [stream, video] = isLocal
      ? [localStream, localVideo]
      : [remoteStream, remoteVideo];

    stream.current = newStream;
    video.srcObject = newStream;
    // notify another user here !!!!!


    /* probably redundant */
    // if (isLocal && isInitiator) {
    //   maybeStart();
    // }
  }

  const handleLocalStream = () => {
    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then(handleAddStream)
      .catch(() => { });
  }

  const closePeerConnection = () => {
    peerConnection.current.close();
    peerConnection.current = undefined;

    /* display info message */
  }

  const handleHangup = () => closePeerConnection();

  const cancelInvitation = () => { }
  const declineInvitation = () => { }

  const handleRemoteHangup = () => {
    closePeerConnection();
    /* change redux status, display message */
  }

  const handleIceCandidate = (event) => {
    if (event.candidate) {
      // sendMessage({
      //   type: 'candidate',
      //   label: event.candidate.sdpMLineIndex,
      //   id: event.candidate.sdpMid,
      //   candidate: event.candidate.candidate
      // }, room);
    }
  }

  function createPeerConnection() {
    try {
      peerConnection.current = new RTCPeerConnection(config);
      peerConnection.current.onicecandidate = handleIceCandidate;
      peerConnection.current.onaddstream = (_stream) => handleAddStream(_stream, false);
      peerConnection.current.onremovestream = () => console.log('remove stream');
    } catch (e) { }
  }

  const setLocalAndSendMessage = (sessionDescription) => {
    peerConnection.current.setLocalDescription(sessionDescription);
    // sendMessage(sessionDescription, room);
  }

  const initiateCall = () => {
    peerConnection.createOffer(setLocalAndSendMessage, () => console.log('err'));
  }

  const maybeStart = () => {
    if (localStream.current /* !==undefined */) {/* should be always true */
      createPeerConnection();
      peerConnection.current.addStream(localStream.current);
      // isStarted = true;

      if (isInitiator) {
        initiateCall();
      }
    }
  }

  useEffect(() => {
    if (isInitiator) {
      handleLocalStream();
      /* what should be done with notifying callee? */
    }
    window.onbeforeunload = function () { };
    // probably send beacon
    // or let socket server on backend handle disconnect
  }, [])

  useEffect(() => {
    if (call.status === CallStatuses.APPROVED && !localStream.current) {
      handleLocalStream();
    }
    if (call.status === CallStatuses.MEDIA_READY && !peerConnection.current) {
      maybeStart();
    }
  }, [call])

  return (
    <div>
      <div ref={localVideo}></div>
      <div ref={remoteVideo}></div>
    </div>
  )
}

const mapStateToProps = ({ users, calls }) => ({
  users,
  calls,
})
export default connect(mapStateToProps, { setModal })(OngoingCall);
// socket.on('chat', function(message, room) {
  // if (message === 'got user media') redux should be updated
//   } else if (message.type === 'offer') {
//     if (!isInitiator && !isStarted) {
//       maybeStart();
//     }
//     peerConnection.setRemoteDescription(new RTCSessionDescription(message));
//     doAnswer();
//   } else if (message.type === 'answer' && isStarted) {
//     peerConnection.setRemoteDescription(new RTCSessionDescription(message));
//   } else if (message.type === 'candidate' && isStarted) {
//     var candidate = new RTCIceCandidate({
//       sdpMLineIndex: message.label,
//       candidate: message.candidate
//     });
//     peerConnection.addIceCandidate(candidate);
//   } else if (message === 'bye' && isStarted) {
//     handleRemoteHangup();
//   }
// });
