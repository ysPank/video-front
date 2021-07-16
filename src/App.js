import Layout from 'antd/lib/layout/layout';
import { React, useEffect } from 'react';
import { connect } from 'react-redux';

import CallModal from './components/CallModal';
import { getUsers } from './redux/users/actions';
import ClientsList from './views/ClientsList';
import Header from './views/Header';

const App = ({
  getUsers,
  modalOpen,
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers])

  return (
    <Layout>
    <Header />
    <main>
      <ClientsList />
      {modalOpen && <CallModal />}
    </main>
    </Layout>
  );
}

const mapStateToProps = ({ calls }) => ({
  modalOpen: calls.modalOpen,
})

export default connect(mapStateToProps, { getUsers })(App);
