import { Box, Button, Flex, Heading } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';

export default (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Layout pageTitle="Todo Home">
      <Flex sx={{ flexDirection: 'column', padding: 3 }}>
        {user ? (
          <Box sx={{ textAlign: 'center' }}>
            <Heading>Howdy {user.user_metadata.full_name} 👋</Heading>
            <Heading as="h3">Manage Todos in your Dashboard</Heading>
          </Box>
        ) : (
          <>
            <Heading>Get Stuff Done</Heading>
            <Button
              sx={{ mt: 2 }}
              onClick={() => {
                netlifyIdentity.open();
              }}
            >
              Log In
            </Button>
          </>
        )}
      </Flex>
    </Layout>
  );
};
