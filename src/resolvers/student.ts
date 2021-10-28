import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
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

@InputType()
class LoginInput{
  @Field()
  username:string

  @Field()
  password:string
}

@Resolver()
export class StudentResolver {
  @Mutation(() => Student, { nullable: true })
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

  @Mutation(() => Student)
  async login(@Arg("details")loginInput:LoginInput,@Ctx(){req}:MyContext):Promise<Student|undefined> {
    const stud=await Student.findOne({username:loginInput.username,password:loginInput.password})
    if(stud!==undefined){
      req.session.username=stud.username;
      
      return stud;
    }
    return undefined;
  }

  @Query(()=>Student,{nullable:true})
  async me(@Ctx(){req}:MyContext):Promise<Student|undefined>{
    if(!req.session.username){
      return undefined
    }
    return Student.findOne({username:req.session.username})
  }
}
