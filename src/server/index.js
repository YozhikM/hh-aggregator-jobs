const express = require('express');
const bodyParser = require('body-parser');
const ParcelBundler = require('parcel-bundler');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { graphqlSchema } = require('../schema');
const initDB = require('../mongo');

initDB();

const app = express();
const bundler = new ParcelBundler('index.html');

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphqlSchema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(bundler.middleware());
app.listen(process.env.PORT || 4000, () => console.log('Now browse to localhost:4000/graphiql'));
