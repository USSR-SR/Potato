import { Course } from "../entities/Course";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class CourseDetails {
  @Field()
  name: string;
  @Field()
  author: string;
  @Field()
  parts: number;
  @Field()
  subject: string;

  @Field()
  body:string;
}

@Resolver()
export class CourseResolver {
  @Mutation(() => Course, { nullable: true })
  async createCourse(
    @Arg("details") details: CourseDetails
  ): Promise<Course | undefined> {
    const course = await Course.create(details).save();
    return course;
  }
  @Query(() => [Course])
  async getAllCourses(): Promise<Course[]> {
    return Course.find();
  }
}
