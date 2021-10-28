import { StudentCourseResolver } from "./resolvers/studentcourse";
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
import { StudentResolver } from "./resolvers/student";
import { FlashCardREsolver } from "./resolvers/flashcard";
import session from "express-session";
import connectpgSimple from "connect-pg-simple";
import { Client, defaults } from "pg";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

declare module "express-session" {
  export interface SessionData {
    username: string;
  }
}

const main = async () => {
  defaults.ssl = true;  
  const PGStore = connectpgSimple(session);
  const pgClient = new Client(process.env.DATABASE_URL);
  pgClient.connect();

  const conn = await createConnection(ormConfig);


  conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );
  app.use(
    session({
      store: new PGStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: "somesecretbro",
      resave: false,
      saveUninitialized: false,
      proxy: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CourseResolver,
        StudentResolver,
        FlashCardREsolver,
        StudentCourseResolver,
      ],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT || 4000, () => {
    console.log("yep");
  });
};

main().catch((err) => {
  console.log(err);
});
