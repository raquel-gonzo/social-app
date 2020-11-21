const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
//import the post & schema
const Post = require('./models/Post');
const User = require('./models/User');

//import the connection string
const { MONGODB_CLUSTER_STRING } = require('./config.js')


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