<<<<<<< HEAD
console.log("gand-mara");
=======
import "reflect-metadata";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import ormConfig from "./orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CourseResolver } from "./resolvers/course";
import cors from "cors";
import { MyContext } from "./types";

const main = async () => {
  const conn = await createConnection(ormConfig);
  conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CourseResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("yep");
  });
};

main().catch((err) => {
  console.log(err);
});
>>>>>>> 1970039ec117552c156f815583fa50f4e7942771
