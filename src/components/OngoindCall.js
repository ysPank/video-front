import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { setCall, setModal } from '../redux/calls/actions';
import SocketService from '../api/socket';
import {
  handleAnswer,
  handleICECandidateEvent,
  handleNegotiationNeededEvent,
  handleNewICECandidateMsg
} from '../helpers/callUtils';
import { SocketEvents } from '../constants/socketEvents';
import { cancelCall, sendRTCAnswer } from '../api/socketHandlers';
import { handleBlockUnload } from '../helpers/Utils';
import styled from 'styled-components';
import { Button } from 'antd';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
`

const Video = styled.video`
  flex: 0 0 50%;
  max-width: 50%;
`

/* should be received from backend */
const config = {
  iceServers: [
    {
      // url: 'stun:global.stun.twilio.com:3478?transport=udp',
      urls: 'stun:global.stun.twilio.com:3478?transport=udp'
    },
    {
      // url: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: '9b26f57fc4a474fcfd1a6254f87ba662cf0d5c746f08349a7fbb31ca06af1d34',
      urls: 'turn:global.turn.twilio.com:3478?transport=udp',
      credential: 'KL5hpKaWNCAsHetvrMpUKePhMiFHcxf9FAyWg/8BEyM='
    },
    {
      // url: 'turn:global.turn.twilio.com:3478?transport=tcp',
      username: '9b26f57fc4a474fcfd1a6254f87ba662cf0d5c746f08349a7fbb31ca06af1d34',
      urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
      credential: 'KL5hpKaWNCAsHetvrMpUKePhMiFHcxf9FAyWg/8BEyM='
    },
    {
      // url: 'turn:global.turn.twilio.com:443?transport=tcp',
      username: '9b26f57fc4a474fcfd1a6254f87ba662cf0d5c746f08349a7fbb31ca06af1d34',
      urls: 'turn:global.turn.twilio.com:443?transport=tcp',
      credential: 'KL5hpKaWNCAsHetvrMpUKePhMiFHcxf9FAyWg/8BEyM='
    }
  ]
}

const OngoingCall = ({ setModal, setCall }) => {
  const call = useSelector(state => state.calls.call);
  const user = useSelector(state => state.users.me);

  const socketRef = useRef(SocketService.socket);

  const opponentId = useRef([call.caller, call.callee].find(({ id }) => id !== user.id).socketId);

  const peerConnection = useRef();
  const localStream = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();

  const [streamConstraints, setStreamConstraints] = useState({
    audio: true,
    video: true
  });

  const closePeerConnection = () => {
    console.log(peerConnection)
    peerConnection.current?.close()
    peerConnection.current = undefined;
  }

  const handleCallCleanup = () => {
    closePeerConnection();
    if(localStream.current) {
      localStream.current
      .getTracks()
      .forEach(track => track.stop());
    }

    // localStream.current = undefined;
    // localVideo.current = undefined;
    // remoteVideo.current = undefined;
    // opponentId.current = undefined;
  }

  const handleTrackEvent = ({ streams }) => {
    // console.log(remoteVideo.current, '---track evert')
    /* if(remoteVideo.current) */ remoteVideo.current.srcObject = streams[0];
  }

  function createPeerConnection(opponentSocketId) {
    const peer = new RTCPeerConnection(config);

    peer.onicecandidate = (e) => handleICECandidateEvent(e, opponentId.current);
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(opponentSocketId, peer);

    return peer;
  }

  function callUser(opponentSocketId) {
    peerConnection.current = createPeerConnection(opponentSocketId);

    localStream.current
      .getTracks()
      .forEach(track => peerConnection.current.addTrack(track, localStream.current));
  }

  function handleRecieveCall(incoming) {
    peerConnection.current = createPeerConnection();

    peerConnection.current.setRemoteDescription(new RTCSessionDescription(incoming.sdp))
      .then(() => localStream.current
        .getTracks()
        .forEach(track => peerConnection.current.addTrack(track, localStream.current))
      )
      .then(() => peerConnection.current.createAnswer())
      .then(answer => {
        peerConnection.current.setLocalDescription(answer)
        return answer;
      })
      .then(answer => {
        sendRTCAnswer({
        target: incoming.caller,
        caller: socketRef.current.id,
        sdp: answer
      })
    })
  }

  const handleHangup = () => {
    cancelCall(call.id);
    setCall(null);
    setModal(null);
  }

  useEffect(() => {
    const blockUnloadCleanup = handleBlockUnload();

    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then(stream => {
        localVideo.current.srcObject = stream;
        localStream.current = stream;


        if(user.id === call?.callerId) {
          callUser(call.callee.socketId);
        }

        socketRef.current.on(SocketEvents.OFFER, handleRecieveCall);
        socketRef.current.on(SocketEvents.ANSWER, e => handleAnswer(e, peerConnection.current));
        socketRef.current.on(SocketEvents.ICE_CANDIDATE, e => handleNewICECandidateMsg(e, peerConnection.current));
      });

      return () => {
        console.log('cleaned up')
        blockUnloadCleanup();
        handleCallCleanup();
        peerConnection.current = undefined;

      }
  }, []);

  return (
    <Container>
      <Video ref={localVideo} autoPlay />
      <Video ref={remoteVideo} autoPlay />

      <Button onClick={handleHangup}>End Call</Button>
    </Container>
  )
}

const mapStateToProps = ({ users, calls }) => ({
  users,
  calls,
})
export default connect(mapStateToProps, { setModal, setCall })(OngoingCall);


// issue oif reconnect
