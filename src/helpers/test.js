/* checks if user initiated convo */
let isInitiator = false;
let isStarted = false;
let localStream;
let peerConnection;

const pcConfig = {}/* turnconfig */
let socket;

const closePeerConnection = () => {
  isStarted = false;
  peerConnection.close();
  peerConnection = null;
}
const handleAddStream = () => {};
const handleRemoteHangup = () => {}
function createPeerConnection() {}
function handleIceCandidate(event) {}


//Ask server to add in the room if room name is provided by the user

//Event - Client has created the room i.e. is the first member of the room
//Event - Room is full, so convo can be started
//Event - Another client tries to join room
//Event - Client has joined the room

//Event - for sending meta for establishing a direct connection using WebRTC
//The Driver code
socket.on('message', function(message, room) {
    if (message === 'got user media') {
      maybeStart();
    } else if (message.type === 'offer') {
      if (!isInitiator && !isStarted) {
        maybeStart();
      }
      peerConnection.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    } else if (message.type === 'answer' && isStarted) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      peerConnection.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
});


const isReadyToCall = () => !isStarted && typeof localStream !== 'undefined';

//If initiator, create the peer connection
function maybeStart() {
  if (isReadyToCall()) {
    createPeerConnection();
    peerConnection.addStream(localStream);
    isStarted = true;

    if (isInitiator) {
      doCall();
    }
  }
}

//Function to create offer
function doCall() {
  peerConnection.createOffer(setLocalAndSendMessage, () => console.log('err'));
}

//Function to create answer for the received offer
function doAnswer() {
  peerConnection.createAnswer().then(
    setLocalAndSendMessage,
    (err) => console.error('err')
  );
}

//Function to set description of local media
function setLocalAndSendMessage(sessionDescription) {
  peerConnection.setLocalDescription(sessionDescription);
  // sendMessage(sessionDescription, room);
}

/*
### Flow
1. make sure both user want to participate by socket events
2. room should be created
3. RTCSessionDescriptions should be recieved by both parties for RTCPeerConnection
4. users should exchange ICE candidates
 */
