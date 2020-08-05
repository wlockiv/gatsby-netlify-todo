import { Box, Container, Flex, Heading, NavLink } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import { Link } from '@reach/router';

const Nav = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  const NavLinkEmoji = ({ emoji, label, ...props }) => {
    return (
      <NavLink py={2} px={1} {...props}>
        <span role="img" aria-label={label}>
          {emoji}
        </span>
        &nbsp;{label}
      </NavLink>
    );
  };

  return (
    <Flex as="nav">
      <NavLinkEmoji as={Link} emoji="🏠" label="Home" to="/" />
      <NavLinkEmoji as={Link} emoji="📃" label="App" to="/app" />
      {user ? (
        <NavLinkEmoji
          sx={{ ml: 'auto', cursor: 'pointer' }}
          emoji="✌"
          label={`Log Out ${user.user_metadata.full_name}`}
          to="#!"
          onClick={() => {
            netlifyIdentity.logout();
          }}
        />
      ) : (
        <>
          <NavLinkEmoji
            sx={{ ml: 'auto', cursor: 'pointer' }}
            emoji="📝"
            label="Sign Up"
            href="#!"
            onClick={() => {
              netlifyIdentity.open('signup');
            }}
          />
          <NavLinkEmoji
            sx={{ cursor: 'pointer' }}
            emoji="🚪"
            label="Log In"
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.open('login');
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default ({ children, pageTitle }) => {
  return (
    <Container>
      <Nav />
      <Box as="header" p={2}>
        <Heading as="h1">{pageTitle}</Heading>
      </Box>
      <Container as="main" p={3}>
        {children}
      </Container>
    </Container>
  );
};
