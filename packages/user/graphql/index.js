const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const userMutation = require('./mutations/User');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'User Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "world";
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'User Query',
    fields: {
        login:userMutation.login(),
        register:userMutation.register()
    }
})

const RootGrapQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation:RootMutation
});

module.exports = RootGrapQLSchema;