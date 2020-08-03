import { Button, Container, Flex, Heading, NavLink } from 'theme-ui';
import { Link, Router } from '@reach/router';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import netlifyIdentity from 'netlify-identity-widget';

let Dash = () => {
  const { user } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink as={Link} to="/" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Container>
        Dash hasUser: {user && user.user_metadata.full_name}
      </Container>
    </Container>
  );
};

let DashLoggedOut = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink as={Link} to="/" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
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
    </Container>
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
