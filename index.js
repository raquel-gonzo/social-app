const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//import the connection string
const { MONGODB_CLUSTER_STRING } = require('./config.js')


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