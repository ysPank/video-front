import React from 'react'
import { connect } from 'react-redux';
import Button from 'antd/lib/button';

import { CallStatuses } from '../constants/callStatuses'
import { Title } from './Typogrhaphy'
import { cancelCall, acceptCall } from '../api/socketHandlers';
import { setCall, setModal } from '../redux/calls/actions';

const messageToDisplay = (isInitiator, { caller, status }) => {
  if (isInitiator && status === CallStatuses.PENDING) {
    return 'Your invitation is pending';
  }
  if (!isInitiator && status === CallStatuses.PENDING) {
    return `You've been invited to chat by ${caller?.name || 'Anonymus'}`;
  }

  return 'Call has been finished';
}

/**
 * Component to display pending call state
 * @param {Object} props
 * @param {boolean} props.isInitiator Has current user initiated the call
 * @param {CallInstance} props.call Current call
 * @param {function} setModal Redux action to manage modal state
 */
const CallStates = ({
  isInitiator,
  call,
  setModal,
}) => {
  const declineCall = () => {
    cancelCall(call.id);
    setCall(null);
    setModal(false);

  }

  return (
    <>
      <Title>
        {messageToDisplay(isInitiator, call)}
      </Title>
      {call.status === CallStatuses.PENDING && (
        <>
          {!isInitiator && <Button onClick={() => acceptCall(call.id)}>Accept</Button>}
          <Button onClick={declineCall}>Cancel</Button>
        </>
      )}
    </>
  )
}

export default connect(null, { setModal })(CallStates)
