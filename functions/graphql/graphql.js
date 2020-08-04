const { ApolloServer } = require('apollo-server-lambda');
const faunadb = require('faunadb');
const { types } = require('./types');

const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNA });

const resolvers = {
  Query: {
    todos: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Must be authenticated to get todos.');
      }

      const results = await client.query(
        q.Paginate(q.Match(q.Index('todos_by_user'), user))
      );

      return results.data.map(([ref, text, done]) => ({
        id: ref.id,
        text,
        done,
      }));
    },
  },
  Mutation: {
    addTodo: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error('Must be authenticated to insert todos.');
      }

      const results = await client.query(
        q.Create(q.Collection('todos'), {
          data: {
            text: text,
            done: false,
            owner: user,
          },
        })
      );

      return {
        ...results.data,
        id: results.ref.id,
      };
    },
    updateTodo: async (_, { id, done, text }, { user }) => {
      if (!user) {
        throw new Error('Must be authenticated to update todos.');
      }

      const results = await client.query(
        q.Update(q.Ref(q.Collection('todos'), id), {
          data: {
            done: done,
            text: text,
          },
        })
      );

      return {
        ...results.data,
        id: results.ref.id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: types,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    }

    return {};
  },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
