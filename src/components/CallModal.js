import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal } from 'antd';

import { CallStatuses } from '../constants/callStatuses';
import { setModal } from '../redux/calls/actions';
import OngoindCall from './OngoindCall';
import CallStates from './CallStates';

import 'antd/lib/modal/style/css';

const CallModal = () => {
  const call = useSelector(state => state.calls.call);
  const user = useSelector(state => state.users.me);

  const isInitiator = user.id === call?.caller?.id;

  if(!call?.id || !call?.status) return null;

  return (
    <Modal
      footer={null}
      visible
      closable={false}
      maskClosable={false}
      destroyOnClose={true}
    >
      {[CallStatuses.PENDING, CallStatuses.FINISHED].includes(call.status)
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

export default connect(mapStateToProps, { setModal })(CallModal);
