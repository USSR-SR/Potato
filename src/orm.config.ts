import { StudentCourse } from './entities/StudentCourse';
import { Student } from './entities/Student';
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Course } from "./entities/Course";
import { FlashCard } from './entities/FlashCard';

export default {
  entities: [Course,Student,StudentCourse,FlashCard],
  type: "postgres",
  database: "potatoDB",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: !__prod__,
  debug: !__prod__,
  synchronize: true,
} as Parameters<typeof createConnection>[0];
