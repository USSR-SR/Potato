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
// import connectRedis from "connect-redis";
// import redis from "redis";
import connectMemcached from "connect-memcached";
import { Client } from "memjs";
import session from "express-session";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

declare module "express-session" {
  export interface SessionData {
    username: string;
  }
}

const main = async () => {
  const MemcachedStore = connectMemcached(session);
  const memClient = Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD,
  });
  console.log(memClient.servers);
  // const servers = memClient.servers.map((server) => `${server.host}:${server.port}`);
  const servers = [
    "memcached-16532.c265.us-east-1-2.ec2.cloud.redislabs.com:16532",
  ];

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
      store: new MemcachedStore({
        hosts: servers,
        secret: "sldjsoidjoiasjdoijs",
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
