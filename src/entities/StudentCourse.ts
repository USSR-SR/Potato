import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class StudentCourse extends BaseEntity{
    
    @ManyToOne(()=>Student,(user)=>user.studentCourses,{primary:true})
    student:Student;
    

    @ManyToOne(()=>Course,(course)=>course.studentCourses,{primary:true})
    course:Course;

    @Field
    @Column()
    progress:number


}