import { getConnection } from "typeorm";
import { StudentCourse } from "../entities/StudentCourse";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Course } from "../entities/Course";
import { Student } from "../entities/Student";

@InputType()
class StudentCourseDetails {
  @Field()
  username: string;
  @Field()
  id: string;
}

Resolver();
export class StudentCourseResolver {
  @Mutation(() => StudentCourse, { nullable: true })
  async createStudentCourse(
    @Arg("details") details: StudentCourseDetails
  ): Promise<StudentCourse | undefined> {
    const res = new StudentCourse();
    const stud = await Student.findOne({ username: details.username });
    if (stud !== undefined) {
      res.student = stud;
    }
    const course = await Course.findOne({ id: details.id });
    if (course !== undefined) {
      res.course = course;
      const con = getConnection();
      res.progress = 0;
      con.manager.save(res);
      return res;
    }
    return undefined;
  }
  @Query(() => [Course])
  async getStudentCourses(
    @Arg("Username") username: string
  ): Promise<Course[]> {
    const student_courses = (
      await StudentCourse.find({ relations: ["student", "course"] })
    ).filter((sc) => sc.student.username === username);
    const courses = student_courses.map((sc) => sc.course);

    return courses;
  }

  @Query(() => [Student])
  async getCourseStudent(@Arg("id") id: string): Promise<Student[]> {
    const student_linked = (
      await StudentCourse.find({ relations: ["student", "course"] })
    ).filter((sc) => sc.course.id === id);
    const students = student_linked.map((sc) => sc.student);
    return students;
  }
}
