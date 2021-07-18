import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AntItem from 'antd/lib/list/Item';
import Button from 'antd/lib/button';
import {
  PhoneTwoTone,
  ClockCircleTwoTone,
} from '@ant-design/icons';

import { UserStatuses } from '../constants/userStatuses';
import { setModal } from '../redux/calls/actions';
import { requestCall } from '../api/socketHandlers';

const getIconForStatus = {
  [UserStatuses.AVAILABLE]: null,
  [UserStatuses.PENDING]: < ClockCircleTwoTone />,
  [UserStatuses.ON_CALL]: <PhoneTwoTone />,
}

const ListItem = styled(AntItem)`
  padding: .5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 .6rem 1.2rem 0 rgba(68, 79, 84, 0.05);
  background: white;
`;

const UserItem = ({ user: { id, name, status }, setModal }) => {
  const handleClick = () => {
    if(status === UserStatuses.AVAILABLE) {
      requestCall(id);
      setModal(true);
    }
  }
  return (
    <ListItem>
      <div>
        {name} {getIconForStatus[status]}
      </div>
      <Button disabled={status !== UserStatuses.AVAILABLE} onClick={handleClick}>Invite</Button>
    </ListItem>
  )
};

export default connect(null, { setModal })(UserItem);
