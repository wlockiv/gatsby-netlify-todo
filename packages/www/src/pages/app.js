import { Button, Container, Flex, Heading, NavLink } from 'theme-ui';
import { Link, Router } from '@reach/router';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';
import netlifyIdentity from 'netlify-identity-widget';

let Dash = () => {
  const { user } = useContext(IdentityContext);

  return (
    <Layout>
      <Container>
        Dash hasUser: {user && user.user_metadata.full_name}
      </Container>
    </Layout>
  );
};

let DashLoggedOut = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

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
