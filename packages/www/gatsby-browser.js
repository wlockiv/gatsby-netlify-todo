const React = require('react');
const wrapRootElement = require('./wrap-root-element');
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require('@apollo/client');
const { setContext } = require('apollo-link-context');
const netlifyIdentity = require('netlify-identity-widget');

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: '/.netlify/functions/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

netlifyIdentity.on('logout', () => {
  client.cache.reset();
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};
