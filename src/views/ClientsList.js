import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd';

import { getUsers } from '../redux/users/actions';
import UserItem from '../components/UserItem';

const ClientsList = ({ me, users, pagination, isLoading, getUsers }) => {
  // eslint-disable-next-line
  const userList = useMemo(() => users.filter(user => user.id !== me?.id), [users]);

  return (
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={getUsers}
      hasMore={pagination.totalCount < users.length}
      useWindow={false}
    >
      <List
        dataSource={userList}
        renderItem={user => <UserItem user={user} key={user.id} />}
      >
        {isLoading && (
          <Spin />
        )}
      </List>
    </InfiniteScroll>
  )
}

const mapStateToProps = ({ users: { users, pagination, isLoading, me } }) => ({
  users,
  pagination,
  isLoading,
  me,
})

export default connect(mapStateToProps, { getUsers })(ClientsList);
