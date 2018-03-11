const express = require('express');
const bodyParser = require('body-parser');
const ParcelBundler = require('parcel-bundler');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { connectToDB, graphqlSchema } = require('../schema');
const initDB = require('../mongo');

initDB();

const app = express();
const bundler = new ParcelBundler('index.html');

// connectToDB();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphqlSchema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(bundler.middleware());
app.listen(process.env.PORT || 3000, () => console.log('Now browse to localhost:3000/graphiql'));
