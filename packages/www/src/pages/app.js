import { Button, Flex, Heading } from 'theme-ui';
import React, { useContext } from 'react';

import Dash from '../components/dashboard';
import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';
import { Router } from '@reach/router';

let DashLoggedOut = (props) => {
  const { identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Layout>
      <Flex sx={{ flexDirection: 'column', padding: 3 }}>
        <Heading as="h1">Get Stuff Done</Heading>
        <Button
          sx={{ mt: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      </Flex>
    </Layout>
  );
};

export default (props) => {
  const { user } = useContext(IdentityContext);
  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app"></DashLoggedOut>
      </Router>
    );
  }

  return (
    <Router>
      <Dash path="/app"></Dash>
    </Router>
  );
};
