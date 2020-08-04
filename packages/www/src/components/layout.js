import { Box, Container, Flex, Heading, NavLink } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import { Link } from '@reach/router';

const Nav = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Flex as="nav">
      <NavLink as={Link} to="/" p={2}>
        🏠 Home
      </NavLink>
      <NavLink as={Link} to="/app" p={2}>
        📃 Dashboard
      </NavLink>
      {user ? (
        <NavLink
          variant="button"
          href="#!"
          p={2}
          sx={{ ml: 'auto' }}
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          Log Out {user.user_metadata.full_name}
        </NavLink>
      ) : (
        <>
          <NavLink
            variant="button"
            href="#!"
            p={2}
            sx={{ ml: 'auto' }}
            onClick={() => {
              netlifyIdentity.open('signup');
            }}
          >
            📝 Sign Up
          </NavLink>
          <NavLink
            variant="button"
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.open('login');
            }}
          >
            🚪 Log In
          </NavLink>
        </>
      )}
    </Flex>
  );
};

export default ({ children, pageTitle }) => {
  return (
    <Container>
      <Nav />
      <Container as="main">
        <Box p={2}>
          <Heading as="h1">{pageTitle}</Heading>
        </Box>
        {children}
      </Container>
    </Container>
  );
};
