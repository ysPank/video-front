import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Layout from 'antd/lib/layout/layout';

import CallModal from './components/CallModal';
import { getUsers } from './redux/users/actions';
import { getTwilioConfig } from './redux/calls/actions';
import ClientsList from './views/ClientsList';
import VideoCall from './views/VideoCall';
import Header from './components/Header';

const App = ({
  getUsers,
  modalOpen,
  getTwilioConfig,
}) => {
  useEffect(() => {
    getTwilioConfig()
    getUsers();
  }, [getUsers, getTwilioConfig])

  return (
    <Layout>
    <Header />
    <main>
        <Switch>
          <Route exact path="/" component={ClientsList} />
          <Route exact path="/call" component={VideoCall} />
        </Switch>
      {modalOpen && <CallModal />}
    </main>
    </Layout>
  );
}

const mapStateToProps = ({ calls }) => ({
  modalOpen: calls.modalOpen,
})

export default connect(mapStateToProps, { getUsers, getTwilioConfig })(App);
