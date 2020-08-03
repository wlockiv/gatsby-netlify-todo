import { Button, Container, Flex, NavLink } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import { Link } from 'gatsby';

const Nav = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Flex as="nav">
      <NavLink as={Link} to="/" p={2}>
        Home
      </NavLink>
      <NavLink as={Link} to="/app" p={2}>
        Dashboard
      </NavLink>
      {user ? (
        <NavLink
          variant="button"
          as={Link}
          to="/"
          p={2}
          sx={{ ml: 'auto' }}
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          Log Out {user.user_metadata.full_name}
        </NavLink>
      ) : undefined}
    </Flex>
  );
};

export default ({ children }) => {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
};
