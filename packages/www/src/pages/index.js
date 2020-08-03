import { Button, Flex, Heading } from 'theme-ui';
import React, { useContext } from 'react';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';

export default (props) => {
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
