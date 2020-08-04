import { Box, Button, Flex, Heading } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';

export default (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Layout pageTitle="Todo Home">
      <Flex sx={{ flexDirection: 'column', padding: 2, height: '50vh' }}>
        {user ? (
          <Box sx={{ mt: 'auto', mb: 'auto', textAlign: 'center' }}>
            <Heading>Howdy {user.user_metadata.full_name} 👋</Heading>
            <Heading as="h3">Manage Todos in the Dashboard</Heading>
          </Box>
        ) : (
          <Box sx={{ mt: 'auto', mb: 'auto', textAlign: 'center' }}>
            <Heading>
              <span role="img" aria-label="check mark">
                ✅
              </span>{' '}
              Get Stuff Done
            </Heading>
            <Button
              sx={{ mt: 2, width: '200px' }}
              onClick={() => {
                netlifyIdentity.open();
              }}
            >
              Log In
            </Button>
          </Box>
        )}
      </Flex>
    </Layout>
  );
};
