import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import { CallStatuses } from '../constants/callStatuses';
import { setModal, setCall } from '../redux/calls/actions';
import { Title } from './Typogrhaphy'
import { cancelCall, acceptCall } from '../api/socketHandlers';

import 'antd/lib/modal/style/css';

const messageToDisplay = (isInitiator, { caller, status }) => {
  if (isInitiator && status === CallStatuses.PENDING) {
    return 'Your invitation is pending';
  }
  if (!isInitiator && status === CallStatuses.PENDING) {
    return `You've been invited to chat by ${caller?.name || 'Anonymus'}`;
  }

  return 'Call has been finished';
}

const CallModal = ({
  user,
  call,
  setCall,
  setModal
}) => {
  const isInitiator = user.id === call?.caller?.id;

  const declineCall = () => {
    cancelCall(call.id);
    setCall(null);
    setModal(false);

  }

  if(!call?.id || !call?.status) return null;

  return (
    <Modal
      footer={null}
      visible
      closable={false}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Title>
        {messageToDisplay(isInitiator, call)}
      </Title>
      {call.status === CallStatuses.PENDING && (
        <>
          {!isInitiator && <Button onClick={() => acceptCall(call.id)}>Accept</Button>}
          <Button onClick={declineCall}>Cancel</Button>
        </>
      )}
    </Modal>
  )
}

const mapStateToProps = ({ users: { me: user }, calls: { call } }) => ({
  user,
  call,
});

export default connect(mapStateToProps, { setModal, setCall })(CallModal);
