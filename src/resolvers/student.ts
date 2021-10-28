import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "../entities/Student";

@InputType()
class StudentDetails {
  @Field()
  username: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  password: string;
  @Field()
  mobile_num: string;
}

@Resolver()
export class StudentResolver {
  @Mutation(()=> Student, {nullable: true})
  async createStudent(
    @Arg("details") details: StudentDetails
  ): Promise<Student | undefined> {
    const student = await Student.create(details).save();
    return student;
  }
  @Query(() => [Student])
  async getAllStudents(): Promise<Student[]> {
    return Student.find();
  }
  
}
