const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const conectarDB = require('./config/db');

// ---------------------------------------------------------------------- //
//Conectar a la DB
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs, //le pasamos los types definitios y los resolvers
    resolvers
});


//Arrancar el servidor
server.listen().then(({ url }) => {
    console.log(`Servidor listo en la URL ${url}`);
})