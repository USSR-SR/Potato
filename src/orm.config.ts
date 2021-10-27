import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Course } from "./entities/Course";

export default {
  entities: [Course],
  type: "postgres",
  database: "potatoDB",
  username: "postgres",
<<<<<<< HEAD
  password: "Shivral31",
=======
  password: "2002",
>>>>>>> origin/jesus
  logging: !__prod__,
  synchronize: true,
} as Parameters<typeof createConnection>[0];
