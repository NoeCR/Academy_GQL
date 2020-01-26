// Necesario para realizar la importación de las definiciones en formato .graphql
import 'graphql-import-node';
// Definiciones de los tipos
import typeDefs from './schema.graphql';
// Herramientas de GraphQL para construir los schemas
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
// Importamos los metodos que se encargaran de gestionar las peticiones
import resolvers from '../resolvers/resolversMap';

// Constante que une las definiciones con los resolvers
const schema: GraphQLSchema = makeExecutableSchema ({
    typeDefs,
    resolvers
});
// La exportamos para poder usarla en la configuración del servidor
export default schema;