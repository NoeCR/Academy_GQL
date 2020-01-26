// Paquetes para la configuración básica del servidor
import cors from 'cors';
import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
// Paquete de Apollo Client para conectar con el servidor de GraphQL
import { ApolloServer } from 'apollo-server-express';
// Configuración de los schemas y resolvers
import schema from './schema/index';
// Middleware para mostrar la UI de GraphQL 
import expressPlayGround from 'graphql-playground-middleware-express';

const app = express();

app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
    schema,
    introspection: true
});
// Configuración para leer en formato JSON 
server.applyMiddleware({app});

app.use('/', expressPlayGround({
    endpoint: '/graphql'
}));

const httpServer = createServer(app);

const PORT = process.env.PORT || 5202;

httpServer.listen({ port: PORT }, () => { console.log(`Academy server ready in http://localhost:${PORT}/graphql`)});