const express = require("express");
const bodyParse = require("body-parser");
const graphqlHttp = require("express-graphql");
const app = express();
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth');
app.use(bodyParse.json());

mongoose
  .connect("mongodb://localhost:27017/eventgraphql")
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

app.use(isAuth);
app.use(
  "/graphql",
  graphqlHttp({
    schema:graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);
