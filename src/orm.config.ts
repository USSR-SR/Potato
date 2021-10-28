import { StudentCourse } from './entities/StudentCourse';
import { Student } from './entities/Student';
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Course } from "./entities/Course";

export default {
  entities: [Course,Student,StudentCourse],
  type: "postgres",
  database: "potatoDB",
  username: "postgres",
  password: "2002",
  logging: !__prod__,
  synchronize: true,
} as Parameters<typeof createConnection>[0];
