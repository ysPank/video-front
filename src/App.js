
import { React, useEffect } from 'react';
import { connect } from 'react-redux';

import CallModal from './components/CallModal';
import { getUsers } from './redux/users/actions';
import ClientsList from './views/ClientsList';

const App = ({
  getUsers,
  modalOpen,
}) => {
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <main>
      <ClientsList />
      {modalOpen && <CallModal />}
    </main>
  );
}

const mapStateToProps = ({ calls }) => ({
  modalOpen: calls.modalOpen,
})

export default connect(mapStateToProps, { getUsers })(App);
