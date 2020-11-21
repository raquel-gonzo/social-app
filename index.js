const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require('mongoose');

//import the post & schema
const Post = require('./models/Post');
const User = require('./models/User');

//import the connection string
const { MONGODB_CLUSTER_STRING } = require('./config.js')

// GraphQL types
const typeDefs = `
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`

// for each query, mutation, or subscription, this contains the corresponding resolver. 
const resolvers = {
    Query: {
        async getPosts(){
            try{
                // fetch all posts
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}

// create the apollo server instance
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//connect to database before you start the server. returns a promise,
mongoose.connect( MONGODB_CLUSTER_STRING, { useNewUrlParser: true }, { useUnifiedTopology: true } )
    .then(() => {
        console.log('MongoDB connected.')
        return server.listen({ port: 3000})
    })  // start the server. returns a promise.
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });