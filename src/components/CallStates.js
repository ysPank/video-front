import React from 'react'
import Button from 'antd/lib/button';

import { CallStatuses } from '../constants/callStatuses'
import { Title } from './Typogrhaphy'
import { cancelCall, acceptCall } from '../api/socketHandlers';
import { setModal } from '../redux/calls/actions';
import { connect } from 'react-redux';

const messageToDisplay = (isInitiator, { caller, status }) => {
  if (isInitiator && status === CallStatuses.PENDING) {
    return 'Your invitation is pending';
  }
  if (!isInitiator && status === CallStatuses.PENDING) {
    return `You've been invited to chat by ${caller?.name || 'Anonymus'}`
  }

  return `You've missed your chance, call has been canceled by caller`
}

const CallStates = ({
  isInitiator,
  call,
  setModal,
}) => {
  const declineCall = () => {
    cancelCall(call.id);

    if (isInitiator) {
      /* todo setCall status */
      setModal(false);
    }
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
