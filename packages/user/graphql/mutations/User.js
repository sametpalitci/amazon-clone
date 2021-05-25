const { GraphQLString } = require('graphql');

const UserType = require('../types/User');
const UserResolver = require('../resolvers/User');

function login() {
  return {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (_, args) => UserResolver.login(args),
  };
}

function register() {
  return {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (_, args) => UserResolver.register(args),
  };
}

module.exports = { login, register };
