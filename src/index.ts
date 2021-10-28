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
import connectRedis from "connect-redis";
import redis from "redis";
import session from "express-session";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

declare module "express-session" {
  export interface SessionData {
    username: string;
  }
}

const main = async () => {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient(process.env.REDIS_URL||"", {
    tls: {
      rejectUnauthorised: false,
    },
  });
  
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
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true, //make cookie not accessible to front end
        sameSite: "lax", //csrf protection(?)
        secure: __prod__, //cookie works only in https
      },
      secret: "somesecretbro",
      resave: false,
      saveUninitialized: false,
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
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground({})],
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
