import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { setCall } from '../redux/calls/actions';
import SocketService from '../api/socket';
import {
  getVideoOptions,
  handleAnswer,
  handleICECandidateEvent,
  handleNegotiationNeededEvent,
  handleNewICECandidateMsg
} from '../helpers/callUtils';
import { SocketEvents } from '../constants/socketEvents';
import { cancelCall, sendRTCAnswer } from '../api/socketHandlers';
import { getPreviewFromVideo, handleBlockUnload } from '../helpers/Utils';
import { resolutionsValues } from '../constants/resolutionOptions';
import VideoControl from '../components/VideoCall/VideoControl';
import { checkImageViolation } from '../api';
import { toastConfig } from '../constants/toastConfig';
import { VideoStatuses } from '../constants/videoStatuses';
import ViolationToast from '../components/VideoCall/ViolationToast';

const Container = styled.div`
  position: relative;
`

const absoluteStyles = `
  top: 3rem;
  left: 0;
  position: absolute;
`

const Video = styled.video`
  width: ${props => props.isMinified ? '250px' : '100%'};
  object-fit: cover;
  height: ${props => props.isMinified
      ? '100px'
      : '100%'
  };
  ${props => props.isMinified ? absoluteStyles : ''}
  filter: ${props => props.status !== VideoStatuses.safe ? 'blur(30px)' : 'none'};
`;

const OngoingCall = ({ call, user, setCall, config, history }) => {
  const socketRef = useRef(SocketService.socket);

  const opponentId = useRef([call?.caller, call?.callee].find(({ id } = {}) => id !== user?.id)?.socketId);

  const peerConnection = useRef();
  const localStream = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();

  const [resolution, setResolution] = useState(getVideoOptions())
  const [isMinified, setIsMinified] = useState(true);
  const [isMuted, setIsMuted] = useState(false)
  const [videoStatus, setVideoStatus] = useState(VideoStatuses.pending)

  const [streamConstraints] = useState({
    audio: true,
    video: resolutionsValues[resolution]
  });

  const closePeerConnection = () => {
    console.log(peerConnection)
    peerConnection.current?.close()
    peerConnection.current = undefined;
  }

  const handleCallCleanup = () => {
    closePeerConnection();
    if (localStream.current) {
      localStream.current
        .getTracks()
        .forEach(track => track.stop());
    }
  }

  const handleTrackEvent = async ({ streams }) => {
    remoteVideo.current.srcObject = streams[0];

    getPreviewFromVideo(remoteVideo.current)
      .then(checkImageViolation)
      .then(() => setVideoStatus(VideoStatuses.safe))
      .catch(() => {
        setVideoStatus(VideoStatuses.unsafe)

        toast.warning(
          <ViolationToast acceptVideo={() => setVideoStatus(VideoStatuses.safe)} />,
          {...toastConfig, autoClose: false }
        );
      })
  }

  function createPeerConnection(opponentSocketId) {
    const peer = new RTCPeerConnection(config);

    peer.onicecandidate = (e) => handleICECandidateEvent(e, opponentId.current);
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(opponentSocketId, peer);

    return peer;
  }

  async function callUser(opponentSocketId) {
    peerConnection.current = createPeerConnection(opponentSocketId);

    localStream.current
      .getTracks()
      .forEach(track => peerConnection.current.addTrack(track, localStream.current));
  }

  async function handleRecieveCall(incoming) {
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
    handleBlockUnload()();
    history.replace('/')
  }

  const handleMute = () => {
    const audioTracks = localStream.current.getAudioTracks();
    const currentState = audioTracks[0].enabled;

    setIsMuted(!currentState);
    audioTracks[0].enabled = !currentState;
  }

  const handleMinify = () => setIsMinified(current => !current);

  const updateResolution = (key) => {
    const videoTracks = localStream.current.getVideoTracks();
    videoTracks.forEach(track => {
      setResolution(() => key);
      track.applyConstraints(resolutionsValues[key])
    })
  }

  useEffect(() => {
    if (!call?.id) {
      history.replace('/')
      return false;
    }

    const socketListeners = []

    const blockUnloadCleanup = handleBlockUnload();

    const events = [
      SocketEvents.OFFER,
      SocketEvents.ANSWER,
      SocketEvents.ICE_CANDIDATE,
    ]

    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then(stream => {
        localVideo.current.srcObject = stream;
        localStream.current = stream;


        if (user.id === call?.callerId) {
          callUser(call.callee.socketId);
        }

        socketListeners.push(
          handleRecieveCall,
          e => handleAnswer(e, peerConnection),
          e => handleNewICECandidateMsg(e, peerConnection)
        )

        socketRef.current.once(SocketEvents.OFFER, socketListeners[0]);
        socketRef.current.once(SocketEvents.ANSWER, socketListeners[1]);
        socketRef.current.on(SocketEvents.ICE_CANDIDATE, socketListeners[2]);
      });

    return () => {
      blockUnloadCleanup();
      handleCallCleanup();
      peerConnection.current = undefined;

      socketListeners.forEach((listener, i) => SocketService.socket.off(events[i], listener))
    }
  }, []);

  return (
    <Container>
      <div>
        <VideoControl
          setResolution={updateResolution}
          toggleMinify={handleMinify}
          toggleMute={handleMute}
          handleHangup={handleHangup}
          isMinified={isMinified}
          isMuted={isMuted}
          resolution={resolution}
        />

        <Video
          ref={remoteVideo}
          autoPlay
          fullHeight={isMinified}
          status={videoStatus}
        />

        <Video
          ref={localVideo}
          muted
          autoPlay
          isMinified={isMinified}
          status={VideoStatuses.safe}
        />
      </div>
    </Container>
  )
}

const mapStateToProps = ({ users: { me: user }, calls: { call, config } }) => ({
  user,
  call,
  config
})
export default connect(mapStateToProps, { setCall })(OngoingCall);

