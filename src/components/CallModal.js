import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal } from 'antd';

import { CallStatuses } from '../constants/callStatuses';
import { setModal } from '../redux/calls/actions';
import { setCall } from '../redux/calls/actions';
import OngoindCall from './OngoindCall';
import { cancelCall } from '../api/socketHandlers';
import CallStates from './CallStates';

import 'antd/lib/modal/style/css';

const CallModal = ({
  setModal,
}) => {
  const call = useSelector(state => state.calls.call);
  const user = useSelector(state => state.users.me);

  const isInitiator = user.id === call?.caller?.id;
  const isOngoingCall = [CallStatuses.PENDING, CallStatuses.PENDING].includes(call.status);

  const declineCall = () => {
    cancelCall(call.id);

    if(isInitiator) {
      setModal(false);
    }
  }

  const handelClose = () => {
    if(call.status === CallStatuses.CANCELED) return;
    setModal(false);
  }

  console.log(call, isInitiator)
  if(!call) return null;

  return (
    <Modal
      footer={null}
      visible
      onCancel={handelClose}
    >
      {[CallStatuses.PENDING, CallStatuses.CANCELED].includes(call.status)
        ? <CallStates isInitiator={isInitiator} call={call} />
        : <OngoindCall call={call} />
      }
    </Modal>
  )
}

const mapStateToProps = ({ users, calls }) => ({
  users,
  calls,
});
const mapActionToProps = {
  setModal,
  setCall
}

export default connect(mapStateToProps, { setModal })(CallModal);
