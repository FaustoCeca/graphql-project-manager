import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { startApolloServer } from './app.js';
import { connectDB } from "./db.js";

connectDB();

startApolloServer(typeDefs, resolvers);
