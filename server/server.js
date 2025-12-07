import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { join } from 'path';

import resolvers from './resolvers';

const typeDefs = readFileSync(
  join(__dirname, 'schema.gql'),
  'utf8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('GraphQL running at http://localhost:4000/graphql');
});
