const { gql } = require('apollo-server');

// GraphQL types
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    },
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    },
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts: [Post]
    },
    type Mutation{  # data write, changing the data
        register(registerInput: RegisterInput): User! #input from users as arguments
    }
`